import * as React from "react"
import { hot } from 'react-hot-loader'

export interface HelloProps { compiler: string, framework: string }

const Hello = (props: HelloProps) => (<h1>Hello from {props.compiler} and {props.framework}! </h1>)

export default hot(module)(Hello)
