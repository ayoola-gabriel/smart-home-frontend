import "react-activity/dist/library.css"
import { Squares, Sentry } from "react-activity"

const MyActivity = ({size='40', color='grey'}) => {
  return (
    <div style={{display:'flex',
        justifyContent:'center',
        alignItems: 'center',
        height:'90vh',
        width:'100%'
    }}>
        <Sentry size={size} color={color} speed={0.8}/>
        </div>
  )
}

export default MyActivity