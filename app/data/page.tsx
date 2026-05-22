import AsyncDataPanel from "../../components/AsyncDataPanel";

export const metadata = {
  title: "Async Data — Weather",
};

export default function Page() {
  return (
    <main className="site-shell">
      <div className="page-content">
        <AsyncDataPanel />
      </div>
    </main>
  );
}
