import "./UserView.css";
import { FC } from "react";

interface IUserViewProps {
   username: string,
}

export const UserView: FC<IUserViewProps> = ({ username }) => {
  return (
    <div className="user-view">
      <div className="user-view__logo">
        {username.slice(0, 1).toUpperCase()}
      </div>
      <span className="user-view__name">{username}</span>
    </div>
  );
};
