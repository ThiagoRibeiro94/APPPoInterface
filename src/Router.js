import { createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import FOPage from './pages/FOPage.js'
import VDPage from './pages/VDPage.js'
import LoginPage from './pages/LoginPage.js'
import RespostaPage from './pages/RespostaPage.js'


const AppNavigator = createStackNavigator({
  'LoginPage': {
    screen: LoginPage
  },
  'VDPage': {
    screen:VDPage,
      },
  'FOPage':{
    screen:FOPage
    },
  'RespostaPage':{
    screen:RespostaPage
  }
  },{
    defaultNavigationOptions: {
      title:'Dantzig',
      headerTitleAlign:"center",
      headerTintColor:'#d5f0d8',
      headerStyle:{
        backgroundColor: "#123D1A",
        borderBottomWidth: 1,
        borderBottomColor:'#C5C5C5',
  
      },
      headerTitleStyle:{
        color:'#d5f0d8',
        fontSize:20,
      }
  
    }
  })



const AppContainer = createAppContainer(AppNavigator)


export default AppContainer

