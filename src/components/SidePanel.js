import { Fragment, useState } from "react";
import "../styles/SidePanel.css";

export default function SidePanel({
  setUrlList,
  urlList,
  setIframeUrl,
  iframeUrl,
  hideSidePanel,
}) {
  const [urlData, setUrlData] = useState({ url: "", title: "" });
  const [editTitle, setEditTitle] = useState(-1);

  // console.log(urlData,urlList);

  return (
    <div
      className={
        iframeUrl !== ""
          ? "sidePanel phoneView"
          : hideSidePanel
          ? "display sidePanel"
          : "sidePanel"
      }
    >
      <form className="inputForm" onSubmit={(e) => e.preventDefault()}>
        <input
          className="urlInput"
          autoFocus
          type="text"
          value={urlData.url}
          onChange={(e) => setUrlData({ url: e.target.value, title: "" })}
        />
        <button
          className="addUrl button"
          type="submit"
          onClick={() =>
            urlData.url !== "" &&
            (setUrlList((prev) => [...prev, urlData]),
            setUrlData({ url: "", title: "" }))
          }
        >
          <span className="fa fa-add"></span>
        </button>
      </form>
      <div className="urlList">
        {urlList?.map((data, i) => (
          <Fragment key={i}>
            {i === editTitle ? (
              <form
                className="inputForm title"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className="urlInput title"
                  autoFocus
                  type="text"
                  value={urlData.title}
                  onChange={(e) =>
                    setUrlData(() => ({
                      url: urlList[i].url,
                      title: e.target.value,
                    }))
                  }
                />
                <button
                  className="addTitle button"
                  type="submit"
                  onClick={() =>
                    urlData.title !== "" &&
                    setUrlList(
                      (prev) =>
                        prev.map((urldata, index) => {
                          if (index === i) {
                            return { ...urldata, title: urlData.title };
                          }
                          return urldata;
                        }),
                      setEditTitle(-1)
                    )
                  }
                >
                  <span className="fa fa-add"></span>
                </button>
              </form>
            ) : (
              <div
                className={`urlContainer ${
                  iframeUrl.includes(data.url) && "activeUrl"
                }`}
              >
                <div
                  className="setIframe"
                  onClick={() => setIframeUrl(data.url)}
                >
                  <p className="url">
                    {data.title === "" ? data.url : data.title}
                  </p>
                </div>
                <div className="urlOptions button">
                  <i className="fa-solid fa-caret-down"></i>
                  <div className="options">
                    <button
                      className="urlTitle button"
                      onClick={() => setEditTitle(i)}
                    >
                      Add Title
                    </button>
                    <button
                      className="deleteUrl button"
                      onClick={() =>
                        setUrlList((prev) =>
                          prev.filter((urls, index) => i !== index)
                        )
                      }
                    >
                      Delete Url
                    </button>
                    <button
                      className="openPdf"
                      onClick={() =>
                        setIframeUrl(`https://sci-hub.se/${data.url}`)
                      }
                    >
                      Open PDF
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
