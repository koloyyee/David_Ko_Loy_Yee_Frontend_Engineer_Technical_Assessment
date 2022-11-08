import Link from 'next/link';

const ActionLink = (
    {callForAction, href}:
    {callForAction : string,
    href:string}) => {
  return (
    <Link href={href}>
        {callForAction}
    </Link>
    
  );
};

export default ActionLink;