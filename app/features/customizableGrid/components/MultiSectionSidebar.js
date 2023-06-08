import React from 'react';
import {
  Sidebar,
} from '../../layout/components';


export default function MultiSectionSidebar({show, children}) {
  if (!show) return null;
  return (
    <Sidebar>
      {children.map((element, index) => <div className="sidebar-scrollable-spacing sidebar-scrollable sidebar-scrollable-hidden" key={index}>{element}</div>)
      }
    </Sidebar>
  );
}
