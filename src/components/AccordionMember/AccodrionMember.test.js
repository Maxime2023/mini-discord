import { render } from '@testing-library/react';
import AccordionMember from './index'

test('AccordionMember Render', () => {
  render(<AccordionMember row={'Mock Row'} i={1}/>);
});
