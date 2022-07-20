import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { AppLogo, AppTitle } from "components/Common/Logo";
import styles from "styles/AboutModal.module.css";

const AboutModal = ({ show, handleClose }) => {
  return (
    <>
      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <AppLogo size={30} />
          <AppTitle style={{ fontSize: "1rem" }} className="me-2" />
          <span className={styles.AboutTitle}>#노담이면_좋겠어!</span>
        </Modal.Header>
        <div className={`m-3 ${styles.Content}`}>
          <h5>금연하는 당신을 위한 서비스 😉</h5>
          <p>
            항상 금연을 도전하지만 실패하는 우리들을 위해 만든 서비스입니다.
            내가 금연을 통해 얼마나 큰 긍정적인 효과를 얻었는지 확인하며 목표를
            달성하세요!
          </p>
          <h5>각 수치는 어떻게 계산되나요? 🤔</h5>
          <ul>
            <li>
              <strong>🚭 참은 담배 개피 수</strong>{" "}
              <p>
                하루에 원래 피우던 담배 개피 수를 기반으로 계산됩니다.
                프로필에서 바꿀 수 있어요!
              </p>
            </li>
            <li>
              <strong>⏱️ 아낀 시간</strong>
              <p>한 개피당 왔다갔다 하는 시간까지 평균 15분 걸린다고 해요.</p>
            </li>
            <li>
              <strong>💵 번 돈 액수</strong>
              <p>한 개피당 225원, 흡연 시간만큼의 최저시급을 더해요.</p>
            </li>
            <li>
              <strong>😁 늘어난 수명</strong>
              <p>한 개피당 5분정도의 수명이 단축된다고 해요.</p>
            </li>
          </ul>
          <h5>Contact 🤙</h5>
          <p>
            <a href="https://github.com/custardcream98" target="_blank">
              <strong>Github</strong>
            </a>
            <br></br>
            <a href="https://github.com/custardcream98/smoquit" target="_blank">
              <strong>Github(Repo)</strong>
            </a>
            <br></br>
            <a
              href="https://www.linkedin.com/in/shi-woo-park-668b33147"
              target="_blank"
            >
              <strong>LinkedIn</strong>
            </a>
            <br></br>
            <a href="mailto: custardcream@kakao.com" target="_blank">
              <strong>이메일 custardcream@kakao.com</strong>
            </a>
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <p style={{ fontSize: "0.5rem", color: "black" }}>
            &copy; {new Date().getFullYear()}{" "}
            <a href="https://github.com/custardcream98" target="_blank">
              custardcream98
            </a>
          </p>
        </div>
      </Modal>
    </>
  );
};

AboutModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AboutModal;
