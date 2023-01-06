import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<"svg">>;
  imgSrc?: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Configure",
    imgSrc: "img/home-01-configure.png",
    description: <>Configure an integration with just a few lines of code</>,
  },
  {
    title: "Connect",
    imgSrc: "img/home-02-connect.png",
    description: (
      <>Connect the configured integrations to execute a flow of actions</>
    ),
  },
  {
    title: "Execute",
    imgSrc: "img/home-03-execute.png",
    description: (
      <>
        Deploy your flows to the cloud and let flethy take care of the execution
      </>
    ),
  },
];

function Feature({ title, Svg, imgSrc, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        {Svg && <Svg className={styles.featureSvg} role="img" />}
        {imgSrc && <img src={imgSrc} alt={title} />}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
