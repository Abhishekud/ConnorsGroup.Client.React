import React from 'react';
import NavigationGroupLink from './NavigationGroupLink';

export default function NavigationSubGroupLink({...props}) {
  return (
    <NavigationGroupLink subgroup {...props} />
  );
}
