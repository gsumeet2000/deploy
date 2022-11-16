import "../styles/IFrame.css";

export default function IFrame({ iframeUrl }) {
  return (
    <div className={iframeUrl !== "" ? "iFrame phoneview" : "iFrame "}>
      <iframe className="frame" src={iframeUrl} title="urls"></iframe>
    </div>
  );
}
