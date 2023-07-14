import React, { useState } from "react";
import { useSelector } from "react-redux";

import QueryTemplate from "./components/QueryTemplate";
import PublisherTemplate from "./components/AllowedColumns";

import ProfileTable from "./components/ProfilesTable";
import ItemisedBills from "./components/ItemisedBills";

import {
  adminConsumerConsoleTabs,
  adminProviderConsoleTabs,
  adminConsumerPublisherConsoleTabs,
} from "../../utils/data";

const AdminConsole = () => {
  const state = useSelector((state) => state);
  const user = state && state.user;
  const UserRole = state && state.user && state.user.role;

  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex flex-col w-full">
      <div className="flex h-12 sticky top-0 z-30 py-2 bg-amaranth-800 flex-row items-center justify-between w-full">
        <h3 className="px-5 text-lg font-light text-white">Admin Console</h3>
      </div>

      <div className="tabs pt-8">
        <ul className="px-8">
          {user?.role && user?.role?.includes("Consumer_Admin") && user?.role?.includes("Consumer")
            ? (adminConsumerConsoleTabs?.map((item) => {
              return (
                <li
                  onClick={() => setActiveTab(item.name)}
                  className={`${activeTab === item.name
                    ? "bg-amaranth-100 rounded-t-lg"
                    : "bg-white"
                    } px-8 text-amaranth-900 inline-block cursor-pointer p-3`}
                >
                  {item.tabTitle}
                </li>
              );
            }))
            : user?.role && user?.role?.includes("Consumer_Admin")
              ? (adminConsumerPublisherConsoleTabs?.map((item) => {
                return (
                  <li
                    onClick={() => setActiveTab(item.name)}
                    className={`${activeTab === item.name
                      ? "bg-amaranth-100 rounded-t-lg"
                      : "bg-white"
                      } px-8 text-amaranth-900 inline-block cursor-pointer p-3`}
                  >
                    {item.tabTitle}
                  </li>
                );
              }))
              :
              adminProviderConsoleTabs?.map((item) => {
                return (
                  <li
                    onClick={() => setActiveTab(item.name)}
                    className={`${activeTab === item.name
                      ? "bg-amaranth-100 rounded-t-lg"
                      : "bg-white"
                      } px-8 text-amaranth-900 inline-block cursor-pointer p-3`}
                  >
                    {item.tabTitle}
                  </li>
                );
              })
          }
        </ul>
        <div className="bg-amaranth-100 p-2">
          {user?.role && user?.role?.includes("Consumer_Admin") && user?.role?.includes("Consumer") ? (
            <>
              {activeTab === "profile" && (
                <ProfileTable user={user} UserRole={UserRole} />
              )}
              {activeTab === "itemised_bills" && <ItemisedBills user={user} />}
            </>
          ) : user?.role && user?.role?.includes("Consumer_Admin") ? (
            <>
              {activeTab === "profile" && (
                <ProfileTable user={user} UserRole={UserRole} />
              )}
              {/* {activeTab === "itemised_bills" && <ItemisedBills user={user} />} */}
            </>
          ) :
            (
              <>
                {activeTab === "profile" && (
                  <ProfileTable user={user} UserRole={UserRole} />
                )}
                {activeTab === "query_template" && <QueryTemplate user={user} />}
                {activeTab === "allowed_columns" && (
                  <PublisherTemplate user={user} />
                )}
                {activeTab === "itemised_bills" && <ItemisedBills user={user} />}
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminConsole;
