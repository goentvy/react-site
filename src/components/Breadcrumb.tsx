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
    let pathString = filterPath.split('/');
    let firstParam = pathString[0];
    let secondParam = pathString[1];
    let threeParam = pathString[2];

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            { firstParam && <BreadcrumbSeparator /> }
            { firstParam && (
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to={path}>{firstParam}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            { secondParam && <BreadcrumbSeparator /> }
            { secondParam && (
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to={path}>{secondParam}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            { threeParam && <BreadcrumbSeparator /> }
            { threeParam && (
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to={path}>{threeParam}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}