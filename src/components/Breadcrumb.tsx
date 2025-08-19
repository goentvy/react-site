import { Link, useLocation } from "react-router"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"

export function BreadcrumbWithCustomSeparator() {
    const location = useLocation();
    let path = location.pathname;
    let filterPath = path.startsWith('/') ? path.slice(1) : path;
    return (
        <Breadcrumb>
            <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            { location && (
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to={path}>{filterPath}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}