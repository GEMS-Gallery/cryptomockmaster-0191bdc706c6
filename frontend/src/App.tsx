import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { backend } from 'declarations/backend';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const App: React.FC = () => {
  const [priceData, setPriceData] = useState<[number, number][]>([]);
  const [orderBook, setOrderBook] = useState<{ asks: [number, number][]; bids: [number, number][] }>({ asks: [], bids: [] });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPriceData = await backend.getPriceData();
      setPriceData(fetchedPriceData);

      const fetchedOrderBook = await backend.getOrderBook();
      setOrderBook(fetchedOrderBook);
    };

    fetchData();
  }, []);

  const chartData = {
    labels: priceData.map(([timestamp]) => new Date(timestamp * 1000).toLocaleDateString()),
    datasets: [
      {
        label: 'Price',
        data: priceData.map(([, price]) => price),
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
      },
    ],
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h4" gutterBottom>
                Crypto Trading Mockup
              </Typography>
              <Button variant="contained" color="primary">
                Connect Wallet
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Price Chart
              </Typography>
              <Line data={chartData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Order Book
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Asks</Typography>
                  {orderBook.asks.map(([price, amount], index) => (
                    <Typography key={index} color="error">
                      {price.toFixed(2)} - {amount.toFixed(2)}
                    </Typography>
                  ))}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Bids</Typography>
                  {orderBook.bids.map(([price, amount], index) => (
                    <Typography key={index} color="success">
                      {price.toFixed(2)} - {amount.toFixed(2)}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
