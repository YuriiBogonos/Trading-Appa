import React from 'react';

export interface SVGIconProps {
  fill?: string;
}

export const isSVGIcon = (
  element: React.ReactNode
): element is React.ReactElement<SVGIconProps> => {
  return React.isValidElement(element) && 'props' in element && 'fill' in element.props;
};
