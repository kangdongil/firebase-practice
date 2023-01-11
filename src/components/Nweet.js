import React from "react";

export default ({ nweetObj, isOwner }) => (
  <div>
    <h4>{nweetObj.text}</h4>
    {isOwner && (
      <>
        <button>Delete Nweet</button>
        <button>Edit NWeet</button>
      </>
    )}
  </div>
);
