import React from 'react';
import FeatureItem from './FeatureItem';
import './css/Features.css';

import chatIcon from './css/img/icon-chat.webp';
import moneyIcon from './css/img/icon-money.webp';
import securityIcon from './css/img/icon-security.webp';

function Features() {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      <FeatureItem 
        imgSrc={chatIcon} 
        imgAlt="Chat Icon" 
        title="You are our #1 priority"
        description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
      />
      <FeatureItem 
        imgSrc={moneyIcon} 
        imgAlt="Money Icon" 
        title="More savings means higher rates"
        description="The more you save with us, the higher your interest rate will be!"
      />
      <FeatureItem 
        imgSrc={securityIcon} 
        imgAlt="Security Icon" 
        title="Security you can trust"
        description="We use top of the line encryption to make sure your data and money is always safe."
      />
    </section>
  );
}

export default Features;
