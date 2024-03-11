import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { drawerContentJson } from "@/constants/drawerContentJson";
import { MenuIcon } from "lucide-react";

type NavItem = {
  id: string;
  title: string;
  url: string;
  type: string;
  items: NavItem[];
};

const MenuItemDrawer = ({ item }: { item: NavItem }) => {
  const transformUrl = (
    url: string,
    pageId: string = "clt6sq7730000y9oq9bse775v",
    persona: string = "default"
  ) => {
    const baseURL = new URL(url).origin;
    const handle = url.split("/").pop();
    const newUrl = `${baseURL}/a/h/${pageId}/${persona}/s/${handle}`;
    return newUrl;
  };

  return (
    <>
      {item.items.length > 0 ? (
        <Accordion type="single" collapsible>
          <AccordionItem value={item.id}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              {item.items.map((subItem, idx) => (
                <MenuItemDrawer key={idx} item={subItem} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <Link href={transformUrl(item.url)}>
          <span className="font-light text-base flex">{item.title}</span>
        </Link>
      )}
    </>
  );
};

function SideBar() {
  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent className="p-4">
        {drawerContentJson.items.map((item, idx) => (
          <MenuItemDrawer key={idx} item={item} />
        ))}
      </DrawerContent>
    </Drawer>
  );
}

export default SideBar;
