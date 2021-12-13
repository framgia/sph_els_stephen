export interface DropDownItem {
  name: string;
  description: string;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export interface CallToAction {
  name: string;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}
