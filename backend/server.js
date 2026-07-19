import express from "express";
import cors from "cors";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();

app.use(cors());
app.use(express.json());

const LEETCODE_USERNAME = "grushilreddy";
const CODECHEF_USERNAME = "pod_space_31";

/* ---------------- LEETCODE ---------------- */

app.get("/api/leetcode", async (req, res) => {
  try {
    const query = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            realName
            ranking
            reputation
            school
            countryName
            starRating
          }

          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }

        userContestRanking(username: $username) {
          rating
          attendedContestsCount
          globalRanking
          topPercentage
        }
      }
    `;

    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query,
        variables: {
          username: LEETCODE_USERNAME,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
          "User-Agent":
            "Mozilla/5.0",
        },
      }
    );

    const user = response.data.data.matchedUser;
    const contest = response.data.data.userContestRanking;

    const stats = user.submitStats.acSubmissionNum;

    const get = (difficulty) =>
      stats.find((x) => x.difficulty === difficulty)?.count || 0;

    res.json({
      success: true,
      username: user.username,
      realName: user.profile.realName,
      country: user.profile.countryName,
      school: user.profile.school,
      reputation: user.profile.reputation,
      ranking: user.profile.ranking,
      contributionPoints: user.profile.starRating,

      totalSolved: get("All"),
      easySolved: get("Easy"),
      mediumSolved: get("Medium"),
      hardSolved: get("Hard"),

      contestRating: contest?.rating
        ? Math.round(contest.rating)
        : "N/A",

      acceptanceRate: contest?.topPercentage
        ? `${contest.topPercentage.toFixed(2)}%`
        : "N/A",
    });
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* ---------------- CODECHEF ---------------- */

app.get("/api/codechef", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://www.codechef.com/users/${CODECHEF_USERNAME}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0",
        },
      }
    );

    const $ = cheerio.load(data);

    const profile = {
      success: true,
      username: CODECHEF_USERNAME,

      name: $(".h2-style").first().text().trim(),

      countryName: $(".user-country-name").text().trim(),

      currentRating: $(".rating-number").text().trim(),

      stars: $(".rating").first().text().trim(),

      highestRating: $(".rating-header small").text().trim(),

      globalRank: $("strong").eq(0).text().trim(),

      countryRank: $("strong").eq(1).text().trim(),

      institution: $(".user-details-container li")
        .last()
        .text()
        .trim(),
    };

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* ---------------- START ---------------- */

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});