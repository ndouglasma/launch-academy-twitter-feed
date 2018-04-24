import React from "react";

import Tweet from "../components/Tweet";

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//converts timestamp_ms to "<mon> <day>; if not current year, add 4-digit year
let convertTimestampToDate = (timestamp) => {
  const date = new Date(Date(timestamp));
  const dateDate = (date.getDate()).toString();
  const dateMonth = (date.getMonth()).toString();
  const dateYear = (date.getFullYear()).toString();
  const currentYear = (new Date().getFullYear()).toString();

  let dateString = months[dateMonth].concat(" ").concat(dateDate);

  if (dateYear != currentYear) {
    dateString = dateString.concat(", ").concat(dateYear);
  }

  return dateString;
};

//generate alert boxes for reply, retweet, like, and more icon clicks
let handleClick = (typeClick) => {
  switch(typeClick) {
    case "reply":
      alert("reply");
      break;
    case "retweet":
      alert("retweet");
      break;
    case "like":
      alert("like");
      break;
    case "more":
      alert("favorite");
      break;
    default:
      alert();
  };
};

//check if tweet has entities; if so, reformat tweet text to remove the display_url AND prep media_url
let findEntities = (text, entities) => {
  let newEntity={};
  let newText="";
  let searchRegExp;

  if (entities.hasOwnProperty("media")) {
    newEntity.media_url = entities.media[0].media_url;
    newEntity.display_url = entities.media[0].display_url;

    searchRegExp = new RegExp(entities.media[0].display_url);

    newText = text.replace(searchRegExp,"").trim();
    newEntity.text = newText;
  }

  return newEntity;
};

const TwitterFeed = (props) => {
  let twitterData = props.data.map((elem) => {
    let dateString = convertTimestampToDate(elem.timestamp_ms);

    let entitiesObject = findEntities(elem.text, elem.entities);

    let onReplyClick = () => {
      handleClick("reply");
    };

    let onRetweetClick = () => {
      handleClick("retweet");
    };

    let onLikeClick = () => {
      handleClick("like");
    };

    let onMoreClick = () => {
      handleClick("more");
    };

    return(
      <Tweet
        key={ elem.id_str }
        text={ entitiesObject.hasOwnProperty("text") ? entitiesObject.text : elem.text }
        user_name={ elem.user.name }
        user_screen_name={ elem.user.screen_name }
        user_profile_image_url={ elem.user.profile_image_url }
        date={ dateString }
        retweeted={ elem.retweeted }
        retweet_count={ elem.retweet_count }
        favorited={ elem.favorited}
        favorite_count={ elem.favorite_count }
        onReplyClick={ onReplyClick }
        onRetweetClick={ onRetweetClick }
        onLikeClick={ onLikeClick }
        onMoreClick={ onMoreClick }
        entitiesObject={ entitiesObject }
      />
    );
  });

  return(
    <div id="twitter-feed">
      <div className="grid-x">
        <div className="cell small-2"></div>
        <div className="cell small-8">
          <h1>Twitter Feed</h1>
          { twitterData }
        </div>
        <div className="cell small-2"></div>
      </div>
    </div>
  );
};

export default TwitterFeed;
