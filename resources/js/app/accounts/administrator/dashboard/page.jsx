import { Link } from "@inertiajs/react";
import React from "react";

export default function Page() {
    return (
        <div>
            <Link method="post" href={route("logout")} as="button" >Logout</Link>
        </div>
    );
}
