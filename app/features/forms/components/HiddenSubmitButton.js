import React from 'react';

export default function HiddenSubmitButton({disabled}) {
  return <input type="submit" style={{display: 'none'}} disabled={disabled} />;
}
