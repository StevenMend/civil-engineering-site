import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Info, Phone, Star, MessageSquare, FileText, Lock } from "lucide-react" // Added FileText and Lock
import Link from "next/link"
import LanguageSwitcher from "./language-switcher"
import { useTranslation } from "@/lib/i18n" // Import useTranslation

export function AppSidebar() {
  const { t } = useTranslation() // Use the translation hook

  // Menu items for the sidebar
  const navItems = [
    {
      titleKey: "header.aboutUs",
      href: "#about-us",
      icon: Info,
    },
    {
      titleKey: "header.consulting",
      href: "#consulting",
      icon: MessageSquare,
    },
    {
      titleKey: "header.reviews",
      href: "#reviews",
      icon: Star,
    },
    {
      titleKey: "header.contact",
      href: "#contact",
      icon: Phone,
    },
  ]

  const legalItems = [
    {
      titleKey: "footer.terms",
      href: "/terms",
      icon: FileText,
    },
    {
      titleKey: "footer.privacyPolicy",
      href: "/privacy",
      icon: Lock,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-bold font-micro text-white p-2">{t("header.boxArquitech")}</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("footer.navigation")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{t(item.titleKey)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>{t("footer.legal")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {legalItems.map((item) => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{t(item.titleKey)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>{t("footer.language")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <LanguageSwitcher />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-gray-500 p-2">{t("footer.copyright")}</p>
      </SidebarFooter>
    </Sidebar>
  )
}
