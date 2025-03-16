import axios from "axios"
import { LoginDTO } from "../dto/LoginDTO"
import { SignUpDTO } from "../dto/SignUpDTO";

export const httpGETAuth = () =>  axios.get('/auth');

export const httpPOSTLogin = ({email, password}: LoginDTO) =>
  axios.post('/auth/login', {email, password})

export const httpPOSTSignUp = ({name, email, password}: SignUpDTO) =>
  axios.post('/auth/signup', {name, email, password})