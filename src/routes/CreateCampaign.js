import React, { useState } from "react";
import { useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { fireStore } from "firebaseSetup";
import { DOC_CAMPAIGNS } from "firebaseSetup/docNames";

const CreateCampaign = () => {
  const profile = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "name") {
      setName(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let newCampaign = {
      uid: profile.uid,
      name: name,
      startsAt: Date.now(),
      endsAt: 0,
    };

    try {
      await addDoc(collection(fireStore, DOC_CAMPAIGNS), newCampaign);

      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="name"
        type="text"
        placeholder="목표를 적어봐요 🗓️"
        required
        value={name}
        onChange={onChange}
      />
      <input type="submit" name="submit" value="나도 이제 #노담인! 😉" />
    </form>
  );
};

export default CreateCampaign;
