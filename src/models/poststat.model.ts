import mongoose from "mongoose";

const PostStatsSchema = new mongoose.Schema({
  period: { type: String, required: true },  // "week" 또는 "month"
  startDate: { type: String, required: true },  // YYYY-MM-DD (주간) or YYYY-MM-01 (월간)
  visibility: { type: String, required: true },  // "public", "company", "department"
  posts: [
    new mongoose.Schema(
    {
      rank: Number,  // 순위
      postId: Number,
      userId: Number,
      title: String,
      companyId: Number,
      isAnonymous: Boolean,
      visibility: String,
      createdAt: Date,
      updatedAt: Date,
      totalViews: Number,
      totalLikes: Number,
      totalComments: Number,
      score: Number,
    },
    {_id : false}
  )
  ],
  createdAt: { type: Date, default: Date.now },  // 데이터 저장 시간
});

const PostStats = mongoose.model("PostStats", PostStatsSchema);

export default PostStats;
