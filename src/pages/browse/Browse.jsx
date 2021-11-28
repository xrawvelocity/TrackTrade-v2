import ContentWrapper from "components/partials/ContentWrapper";
import Flex from "components/partials/Flex";
import ProtectedRoute from "components/partials/ProtectedRoute";
import SubSideBar from "components/partials/SubSidebar";
import React from "react";
import { Switch } from "react-router-dom";
import AllIdeas from "./AllIdeas";
import AllTraders from "./AllTraders";
import AllTrades from "./AllTrades";

export default function Browse() {
    const subSideBarObj = [
        {
            text: "All Ideas",
            url: "all-ideas",
        },
        {
            text: "All Trades",
            url: "all-trades",
        },
        {
            text: "All Traders",
            url: "all-traders",
        },
    ];

    return (
        <Flex>
            <SubSideBar header="Browse" obj={subSideBarObj} loc="browse" />
            <ContentWrapper contentStyle={{ padding: "30px 50px 60px 300px" }}>
                <Switch>
                    <ProtectedRoute path="/browse/all-ideas">
                        <AllIdeas />
                    </ProtectedRoute>
                    <ProtectedRoute path="/browse/all-trades">
                        <AllTrades />
                    </ProtectedRoute>
                    <ProtectedRoute path="/browse/all-traders">
                        <AllTraders />
                    </ProtectedRoute>
                </Switch>
            </ContentWrapper>
        </Flex>
    );
}
