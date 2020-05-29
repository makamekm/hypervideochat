import React from "react";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import { useLayoutConfig } from "./LayoutService";
import {
  XFocusableContainer,
  XFocusable,
} from "~/components/XFocusable/XFocusable";

export const Dashboard = observer(() => {
  const history = useHistory();
  useLayoutConfig({});
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-4">
      <div className="font-light text-4xl mb-8 text-gray-600 w-full px-10">
        Top TV shows
        <span className="text-xl text-gray-700 ml-4">
          # the most popular shows fot the recent time
        </span>
      </div>
      <XFocusableContainer className="px-10" style={{ maxWidth: "100vw" }}>
        <XFocusable
          className="my-1 mx-2 p-1"
          onClickEnter={() => {
            // history.push("/tvshow/" + 16919);
            history.push("/tvshow/" + 13878);
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
        <XFocusable className="my-1 mx-2 p-1">
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/BNAPOSTER.jpg?w=280&h=385"
          />
        </XFocusable>
        <XFocusable className="my-1 mx-2 p-1">
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/gleipnir.jpg?w=280&h=385"
          />
        </XFocusable>
        <XFocusable className="my-1 mx-2 p-1">
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/1316.jpg?w=280&amp;h=385"
          />
        </XFocusable>
        <XFocusable className="my-1 mx-2 p-1">
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/BNAPOSTER.jpg?w=280&h=385"
          />
        </XFocusable>
        <XFocusable className="my-1 mx-2 p-1">
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/gleipnir.jpg?w=280&h=385"
          />
        </XFocusable>
        <XFocusable className="my-1 mx-2 p-1">
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/1316.jpg?w=280&amp;h=385"
          />
        </XFocusable>
        <XFocusable className="my-1 mx-2 p-1">
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/BNAPOSTER.jpg?w=280&h=385"
          />
        </XFocusable>
        <XFocusable className="my-1 mx-2 p-1">
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/gleipnir.jpg?w=280&h=385"
          />
        </XFocusable>
        <XFocusable className="my-1 mx-2 p-1">
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/1316.jpg?w=280&amp;h=385"
          />
        </XFocusable>
        <XFocusable className="my-1 mx-2 p-1">
          <img
            className="rounded-lg"
            alt="Онлайн аниме Ванпанчмен"
            style={{
              width: "200px",
            }}
            src="https://static.animedia.tv/uploads/BNAPOSTER.jpg?w=280&h=385"
          />
        </XFocusable>
        <XFocusable className="my-1 mx-2 p-1">
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
});
