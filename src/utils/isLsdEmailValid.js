export default function isLsdEmailValid(email) {
  const regex = /^\w+([.-]?\w+)*@(lsd.ufcg.edu.br)/;
  return regex.test(email);
}
