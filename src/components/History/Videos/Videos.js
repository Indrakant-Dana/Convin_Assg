import React from "react";
import { Card } from "antd";
import { useSelector } from "react-redux";

const { Meta } = Card;

const Videos = () => {
  const { isLoading, buckets } = useSelector((state) => state);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {
        //sort and show all cards in every bucket based on number of times clicked
        buckets.map((bucket) => {
          return bucket.cards
            .sort((a, b) => b.clicked - a.clicked)
            .map((card) => (
              <>
                {console.log(card?.name)}
                <Card
                  // hoverable
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    boxShadow: "0px 0px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  <Meta title={card?.name} style={{ marginBottom: "10px" }} />
                  <Meta description={`Link: ${card?.link}`} />
                  <Meta description={`No. of clicked: ${card?.clicked}`} />
                </Card>
              </>
            ));
        })
      }
    </div>
  );
};

export default Videos;
