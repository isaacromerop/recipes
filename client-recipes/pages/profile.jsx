import React from "react";
import useUserStore from "../context/userContext";
import { useRouter } from "next/router";

const Profile = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  return user ? (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile Page</h1>
      </div>
      <div className="profile-body">
        <h2>Content</h2>
      </div>
    </div>
  ) : (
    <div className="profile-page">
      <div className="profile-content">
        <h1>Go to login</h1>
        <button
          onClick={() => router.push("/login")}
          className="profile-gotoLogin"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Profile;
