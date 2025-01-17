'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const FileExplorerBreadcrumb: React.FC = () => {
  const pathname = usePathname()

  return (
    <Breadcrumb className="p-4">
      <BreadcrumbList>
        {pathname
          .split('/')
          .filter((path) => path != '')
          .map((p, i, arr) => {
            const href = '/' + arr.slice(0, i + 1).join('/')
            const name = p == 'home' ? 'All your files' : p
            const isFirst = i !== arr.length - 1
            const isLast = i === arr.length - 1

            if (arr.length == 1) {
              return (
                <BreadcrumbItem key={i}>
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                </BreadcrumbItem>
              )
            }

            if (isFirst) {
              return (
                <BreadcrumbItem key={i}>
                  <BreadcrumbLink asChild>
                    <Link href={href}>{name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )
            }

            if (isLast) {
              return (
                <React.Fragment key={i}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </React.Fragment>
              )
            }

            return (
              <React.Fragment key={i}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={href}>{name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            )
          })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default FileExplorerBreadcrumb
