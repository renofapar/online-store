import {MainCarousel} from './MainCarousel'
import {ShoppingList} from './ShoppingList'
import {SubscribeLine} from './SubscribeLine'
export const Home = () => {
  return <div className='home'>
    <MainCarousel />
    <ShoppingList />
    <SubscribeLine />
  </div>
}

