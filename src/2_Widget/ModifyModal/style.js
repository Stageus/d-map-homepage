import styled from "styled-components";

const STYLE = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  MapContainer: styled.div`
    width: 80%;
  `,
  SliderContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    max-width: 400px;
  `,
  Slider: styled.input`
    flex: 1;
  `,
  ColorPicker: styled.input`
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  `,
  ButtonContainer: styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  `,
  Button: styled.button`
    flex: 1;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #0047ab;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #003580;
    }
  `,
};

export default STYLE;
