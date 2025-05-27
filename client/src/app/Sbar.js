'use client'
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import dashpic from "./dash.png"
import livefeed from "./video.png"
import map from "./map.png"
import noti from "./noti.png"
import logs from "./logs.png"
import paw from "./paw.png"
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import {
  ArticleIcon,
  CollapsIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  UsersIcon,
  VideosIcon,
} from "./icons";

// These are items in sidebar
const menuItems = [
  { id: 1, label: "Live Feed", icon: dashpic, link: "/" },
  { id: 2, label: "Map", icon: map, link: "/map" },
  { id: 3, label: "Notifications", icon: noti, link: "/notif" },
  { id: 4, label: "Database Logs", icon: logs, link: "/log" },
];

const cameraBlocks = [
  { id: 1, label: "Camera 1", icon: livefeed, link: "/dashboard/item1"},
  { id: 2, label: "Camera 2", icon: livefeed, link: "/dashboard/item2"},
  { id: 3, label: "Camera 3", icon: livefeed, link: "/dashboard/item3"},
  { id: 4, label: "Camera 4", icon: livefeed, link: "/dashboard/item4"},
  { id: 5, label: "Camera 5", icon: livefeed, link: "/dashboard/item5"},
  { id: 6, label: "Camera 6", icon: livefeed, link: "/dashboard/item6"}
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

//Here w-60 is width of sidebar before collapse and w-20 is width after collapse
  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col",
    {
      ["w-60"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]:activeMenu && activeMenu.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      // In transition 500ms is time to collapse, 0s is delay time to open sidebar, cubic-bezier is transition function with times of effect
      style={{ transition: "width 500ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4 pr-0">
            <Image alt="dashboard sign" width={60} height={50} src={paw}/>
            {/* <LogoIcon /> */}
            <span
              className={classNames("mt-2 text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              Dashboard
            </span>
          </div>
          {/* this decides closing of sidebar */}
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-6">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
                <div key={menu.id} className={classes}>
                    <Link href={menu.link} legacyBehavior>
                        <a className="flex py-4 px-3 items-center w-full h-full">
                            <div style={{ width: "2.5rem" }}>
                                <Image alt="icon" src={Icon} height={100} width={100} />
                            </div>
                            {!toggleCollapse && (
                                <span className={classNames("text-md px-4 font-medium text-text-light")}>
                                   {menu.label}
                                </span>
                            )}
                        </a>
                    </Link>
                </div>
            );
          })}
        </div>
        <div className="flex flex-col items-start mt-2">
          
            {!toggleCollapse && (
            <div 
              
            >
          ___________________________

            </div>
          )}
          
          {cameraBlocks.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
                <div key={menu.id} className={classes}>
                    <Link href={menu.link} legacyBehavior>
                        <a className="flex py-4 px-3 items-center w-full h-full">
                            <div style={{ width: "2.5rem" }}>
                                <Image alt="icon" src={Icon} height={100} width={100} />
                            </div>
                            {!toggleCollapse && (
                                <span className={classNames("text-md font-medium text-text-light")}>
                                    {menu.label}
                                </span>
                            )}
                        </a>
                    </Link>
                </div>
            );
          })}
        </div>
      </div>

      <div className={`${getNavItemClasses({})} px-3 py-4`}>
        <div style={{ width: "2.5rem" }}>
          <LogoutIcon />
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-md font-medium text-text-light")}>
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;