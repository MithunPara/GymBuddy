"use client"
import Image from "next/image";
import styles from "./page.module.css";
import HomeBar1 from "@/components/HomeBar1/HomeBar1";
import HomeBar2 from "@/components/HomeBar2/HomeBar2";

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeBar1 />
      <HomeBar2 />
    </main>
  );
}
