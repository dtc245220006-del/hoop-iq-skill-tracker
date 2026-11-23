import { chatGPTSignOutPath, requireChatGPTUser } from "./chatgpt-auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await requireChatGPTUser("/");

  return (
    <main className="tracker-shell">
      <header className="sync-bar">
        <div>
          <strong>HOOP IQ</strong>
          <span>Đồng bộ lịch tập theo tài khoản của bạn</span>
        </div>
        <div className="sync-account">
          <span>{user.email}</span>
          <a href={chatGPTSignOutPath("/")} target="_top">Đăng xuất</a>
        </div>
      </header>
      <iframe
        className="tracker-frame"
        src="/tracker/index.html"
        title="Hoop IQ — Basketball + Gym Tracker"
      />
    </main>
  );
}
