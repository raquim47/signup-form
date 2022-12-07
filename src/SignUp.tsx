import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
// import TextField from "./TextField"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  h2 {
    font-size: 36px;
    color: #222;
    font-weight: 700;
  }
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 640px;
  padding-top: 30px;
  h3 {
    font-size: 20px;
    color: #222;
    font-weight: 600;
    margin-bottom: 24px;
  }
  button {
    color: #fff;
    border: none;
    border-radius: 4px;
    background-color: #a6adbd;
    height: 44px;
    margin: 20px 0;
    cursor: pointer;
    :hover {
      background-color: #f42844;
    }
  }
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  height: 95px;

  label {
    margin-bottom: 4px;
    font-size: 14px;
    color: #686e7b;
  }

  input {
    height: 44px;
    padding: 0 16px;
    border: 1px solid #a6adbd;
    border-radius: 4px;
    font-size: 14px;
    outline: none;

    ::placeholder {
      color: #a6adbd;
    }
  }
  span {
    color: #f42844;
    font-size: 12px;
    margin-top: 4px;
    margin: 4px 0 0 2px;
  }
`;
// style={{ borderColor: errors?.name?.message ? "red" : "" }}
// import TextField from "./TextField";
interface ISignUpForm {
  email: string;
  userName: string;
  nickName: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  birth: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ISignUpForm>({
    mode: "onBlur",
  });
  // mode는 useForm()에 넘겨줄 수 있는 다양한 optional arguments 중 하나로 사용자가 form을 submit 하기 전에 validation이 실행될 수 있게 해준다.

  // mode에 사용 가능한 값
  // mode: onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'

  // handleSubmit은 validation 등의 확인 작업을 모두 마친 후에 데이터가 유효할 때만 함수 호출}
  const handleValid = (data: ISignUpForm) => {
    alert("가입완료");
    reset();
  };
  return (
    <Container>
      <h2>회원 가입</h2>
      <SignUpForm onSubmit={handleSubmit(handleValid)}>
        {/* <input {...register("email")} required placeholder="Email" />가 아닌 이유: 사용자가 해당 기능을 지원하지 않는 브라우저에서 본다거나, html에 드러난 코드를 수정할 우려. -> html에 의지하는 대신 자바스크립트에서 validation을 수행 */}
        {/* <input {...register("email", { required: true })} placeholder="Email" /> */}
        <h3>회원 정보 입력</h3>
        <InputField>
          <label>
            이메일<span>✶</span>
          </label>
          <input
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일이 형식에 맞지 않습니다",
              },
            })}
            placeholder="ex) abc1234@gmail.com"
          />
          <span>{errors?.email?.message}</span>
        </InputField>
        <InputField>
          <label>
            이름<span>✶</span>
          </label>
          <input
            {...register("userName", {
              required: "이름을 입력해주세요",
              pattern: {
                value: /^[가-힣]{2,7}$/,
                message: "한글로 올바르게 이름을 입력해주세요.",
              },
            })}
            placeholder="ex) 홍길동"
          />
          <span>{errors?.userName?.message}</span>
        </InputField>
        <InputField>
          <label>
            닉네임<span>✶</span>
          </label>
          <input
            // validate 인자로 항목에 현재 쓰여지고 있는 값을 받음, boolean을 반환
            {...register("nickName", {
              required: "닉네임을 입력해주세요",
              pattern: {
                value: /^[가-힣a-zA-Z]{4,16}$/,
                message:
                  "특수문자와 공백을 제외한 4자~16자 사이의 영어 또는 한글을 입력해주세요",
              },
            })}
            placeholder="닉네임"
          />
          <span>{errors?.nickName?.message}</span>
        </InputField>
        <InputField>
          <label>
            비밀번호<span>✶</span>
          </label>
          <input
            {...register("password", {
              required: "비밀번호를 입력해주세요",

              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[?!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
                message:
                  "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요",
              },
            })}
            type="password"
            placeholder="숫자 + 영문자 + 특수문자 조합, 8자리 이상"
          />
          <span>{errors?.password?.message}</span>
        </InputField>
        <InputField>
          <label>
            비밀번호 확인<span>✶</span>
          </label>
          <input
            {...register("passwordConfirm", {
              required: "비밀번호를 확인해주세요",
              validate: (value) =>
                watch().password !== value
                  ? "비밀번호가 일치하지 않습니다"
                  : true,
            })}
            type="password"
          />
          <span>{errors?.passwordConfirm?.message}</span>
        </InputField>
        <InputField>
          <label>생년월일</label>
          <input type="date" {...register("birth")} placeholder="birth" />
          {/* <span>{errors?.birth?.message}</span> */}
        </InputField>
        <button type="submit">가입하기</button>
      </SignUpForm>
    </Container>
  );
};
export default SignUp;
