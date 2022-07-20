import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Button, Spinner } from "react-bootstrap";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { fireStore } from "firebaseSetup";
import { DOC_CAMPAIGNS, DOC_CAMPAIGNS_BY_USER } from "firebaseSetup/docNames";

const CreateCampaign = () => {
  const profile = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    setIsSubmitted(true);
    let newCampaign = {
      uid: profile.uid,
      userName: profile.displayName,
      name: name,
      startsAt: Date.now(),
      endsAt: 0,
      duration: 0,
      lastAttend: Date.now(),
    };

    try {
      await setDoc(
        doc(
          fireStore,
          DOC_CAMPAIGNS_BY_USER,
          profile.uid,
          DOC_CAMPAIGNS,
          `${newCampaign.startsAt}`
        ),
        newCampaign
      );

      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={isSubmitted ? null : onSubmit}>
        <Form.Control
          name="name"
          type="text"
          placeholder="금연해서 슈퍼카 지르기 🏎️"
          required
          value={name}
          onChange={onChange}
        />
        <div className="d-grid gap-2 mt-3">
          <Button
            type="submit"
            name="submit"
            variant="primary"
            disabled={isSubmitted || name === ""}
          >
            {isSubmitted ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
                <span>금연 가즈아</span>
              </>
            ) : name === "" ? (
              <span>목표를 적어주세요 🗓️</span>
            ) : (
              <span>나도 이제 #노담! 😉</span>
            )}
          </Button>
          <Button as={Link} to="/" variant="outline-primary">
            돌아가기
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateCampaign;
