import { useTranslation } from "react-i18next";
import styles from "./Footer.module.css";

const Footer = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      id: 1,
      name: "Erick Gonzalez",
      fai: "FAI-3433",
      role: "role_pm",
      avatar: "/avatars/erick-pixel.png",
    },
    {
      id: 2,
      name: "Abril Gavilan",
      fai: "FAI-5163",
      role: "role_dev",
      avatar: "/avatars/abril-pixel.png",
    },
    {
      id: 3,
      name: "Daniela Oñatibia",
      fai: "FAI-4775",
      role: "role_dev",
      avatar: "/avatars/dani-pixel.png",
    },
  ];

  return (
    <footer className={styles.footerContainer}>
      <h2 className={styles.title}>
        {t("footer_text")}
      </h2>

      <div className={styles.teamCard}>
        {teamMembers.map((member) => (
          <div key={member.id} className={styles.memberRow}>
            <div className={styles.memberInfo}>
              <div className={styles.avatarWrapper}>
                <img
                  src={member.avatar}
                  alt={`Avatar de ${member.name}`}
                  className={styles.avatar}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>

              <div className={styles.nameContainer}>
                <span className={styles.name}>{member.name}</span>
                <span className={styles.fai}>{member.fai}</span>
              </div>
            </div>
            <div className={styles.role} style={{ color: "black" }}>
              {t(member.role)}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.links}>
          <a
            href="https://github.com/DevEriik/MINECRAFT---NoCode-Edition"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkItem}
          >
            <span>🐙</span> github.com/DevErick/MINECRAFT---NoCode-Edition
          </a>
          <a
            href="https://github.com/users/DevEriik/projects/2/views/1"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkItem}
          >
            <span>📁</span> github.com/DevErick/projects
          </a>
        </div>

        <p className={styles.credits}>Hecho por NoCode</p>
      </div>
    </footer>
  );
};

export default Footer;
