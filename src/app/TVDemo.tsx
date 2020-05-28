import React from "react";
import { useLayoutConfig } from "./LayoutService";
import {
  XFocusableContainer,
  XFocusable,
} from "~/components/XFocusable/XFocusable";

export const TVDemo = () => {
  useLayoutConfig({});
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-10">
      <div className="font-bold text-4xl mb-8 -mt-8">TV SHOWS</div>
      <XFocusableContainer className="px-10" style={{ maxWidth: "100vw" }}>
        <XFocusable
          onClickEnter={() => {
            console.log("ENTER");
          }}
        >
          <img
            style={{
              width: "200px",
            }}
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            src="https://static.animedia.tv/uploads/1316.jpg?w=280&amp;h=385"
          />
        </XFocusable>
        <XFocusable>
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/BNAPOSTER.jpg?w=280&h=385"
          />
        </XFocusable>
        <XFocusable>
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/gleipnir.jpg?w=280&h=385"
          />
        </XFocusable>
        <XFocusable>
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/1316.jpg?w=280&amp;h=385"
          />
        </XFocusable>
        <XFocusable>
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/BNAPOSTER.jpg?w=280&h=385"
          />
        </XFocusable>
        <XFocusable>
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/gleipnir.jpg?w=280&h=385"
          />
        </XFocusable>
        <XFocusable>
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/1316.jpg?w=280&amp;h=385"
          />
        </XFocusable>
        <XFocusable>
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/BNAPOSTER.jpg?w=280&h=385"
          />
        </XFocusable>
        <XFocusable>
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/gleipnir.jpg?w=280&h=385"
          />
        </XFocusable>
        <XFocusable>
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/1316.jpg?w=280&amp;h=385"
          />
        </XFocusable>
        <XFocusable>
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/BNAPOSTER.jpg?w=280&h=385"
          />
        </XFocusable>
        <XFocusable>
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/gleipnir.jpg?w=280&h=385"
          />
        </XFocusable>
      </XFocusableContainer>
    </div>
  );
};
