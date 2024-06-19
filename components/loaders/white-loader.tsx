import React from "react";

export const WhiteLoaderWithoutText = () => {
  return (
    <div
      style={{
        background: "#",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <svg
            width="250"
            height="100"
            viewBox="0 0 126 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.8105 20.5V13.7051H3.96289L0.326172 10.0684V5.98047L3.96289 2.35742H6.01367V8.79688H14.3535L17.8672 12.4336V16.877L14.2441 20.5H11.8105ZM6.9707 5.625V2.35742H14.2305L17.375 5.51562V7.44336H11.8105V5.625H6.9707ZM0.326172 15.0586H6.36914V17.2188H10.8535V20.5H3.375L0.326172 16.877V15.0586ZM24.6484 7.25195H30.9375V20.5H24.6484V7.25195ZM19.918 2.35742H35.668V6.30859H19.918V2.35742ZM47.4531 18.5176H41.5195L42.7773 14.9219H46.0586L41.2051 2.35742H47.0977L54.3301 20.5H48.2188L47.4531 18.5176ZM39.9062 20.5H34.0684L40.5488 3.17773L43.2285 10.3828L39.9062 20.5ZM64.1055 20.5H58.2266L51.6641 2.35742H57.8301L64.1055 20.5ZM65.0488 2.35742H71.1191L64.8438 19.9531L62.123 11.9688L65.0488 2.35742ZM72.3906 2.35742H78.8164L83.6836 10.4238L87.5117 3.86133V12.9941L83.1504 20.5L72.3906 2.35742ZM88.4004 20.5V2.35742H94.4434V20.5H88.4004ZM72.377 20.5V4.03906L78.0234 13.5137V20.5H72.377ZM97.4785 5.98047H103.535V20.5H97.4785V5.98047ZM97.4785 0.320312H103.535V4.17578H97.4785V0.320312ZM118.492 18.5176H112.559L113.816 14.9219H117.098L112.244 2.35742H118.137L125.369 20.5H119.258L118.492 18.5176ZM110.945 20.5H105.107L111.588 3.17773L114.268 10.3828L110.945 20.5Z"
              fill="#329632"
            />
          </svg>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <p style={{ color: "#329632", fontSize: "18px" }}>Loading</p>
            <p
              style={{
                border: "8px solid transparent",
                borderTop: "8px solid #329632",
                borderRadius: "50%",
                width: "10px",
                height: "10px",
                animation: "spinLoader 1s linear infinite",
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};
