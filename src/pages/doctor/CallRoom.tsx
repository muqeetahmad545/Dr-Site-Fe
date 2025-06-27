import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function randomID(len: number) {
  let result = "";
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function CallRoom() {
  const roomID = getUrlParams().get("roomID") || randomID(5);
  const userID = "patient_" + randomID(5);
  const userName = getUrlParams().get("userName") || "Anonymous";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMeeting = async () => {
      const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
      const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SECRET_KEY;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      if (!zp || !containerRef.current) {
        console.error("Zego UIKit creation failed or container not found.");
        return;
      }

      zp.joinRoom({
        container: containerRef.current,
        showScreenSharingButton: true,
        sharedLinks: [
          {
            name: "Copy link",
            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
    };

    initMeeting();
  }, [roomID, userID, userName]);

  return (
    <div
      className="myCallContainer"
      ref={containerRef}
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
