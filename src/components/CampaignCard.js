import React from "react";
import PropTypes from "prop-types";

const CampaignCard = ({ name, startsAt, endsAt }) => {
  const date2str = (date) =>
    `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDay()}일 ${date.getHours()}:${date.getMinutes()}`; // 부터` + (endsAt.getTime() > startsAt.getTime() ? `${}`)

  return (
    <div>
      <h4>{name}</h4>
      <span>
        {date2str(startsAt) +
          (endsAt.getTime() > startsAt.getTime()
            ? ` 부터 ${date2str(endsAt)} 까지`
            : "")}
      </span>
    </div>
  );
};

CampaignCard.propTypes = {
  name: PropTypes.string.isRequired,
  startsAt: PropTypes.instanceOf(Date).isRequired,
  endsAt: PropTypes.instanceOf(Date).isRequired,
};

export default CampaignCard;
