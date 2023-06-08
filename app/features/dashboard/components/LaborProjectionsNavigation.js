import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import TreemapTableTabs from './TreemapTableTabs';

export default function LaborProjectionsNavigation() {
  return (
    <div className="navigation">
      <TreemapTableTabs />
      <Breadcrumbs />
    </div>
  );
}
