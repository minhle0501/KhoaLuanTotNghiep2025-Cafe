import React from 'react'
import IntroduceBackground from '../components/IntroduceBackground'
import LatestCompilation from '../components/LatestCompilation '
import BestChoice from '../components/BestChoice'
import OurRules from '../components/OurRules'
import SubsBox from '../components/SubsBox'

const Home = () => {
  return (
    <div>
      <IntroduceBackground />
      <LatestCompilation />
      <BestChoice />
      <OurRules />
      <SubsBox />
    </div>
  )
}

export default Home