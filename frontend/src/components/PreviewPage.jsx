import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const CouponManagementPage = () => {
  const [coupons, setCoupons] = useState([
    { id: 1, name: 'Coupon 1', discount: '20%', expiryDate: '2022-12-31' },
    { id: 2, name: 'Coupon 2', discount: '30%', expiryDate: '2022-11-30' },
    { id: 3, name: 'Coupon 3', discount: '40%', expiryDate: '2022-10-31' },
  ]);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    const response = await fetch('https://api.example.com/coupons');
    const data = await response.json();
    setCoupons(data);
  };

  return (
    <Box>
      <Text fontSize="2xl" mb="5">Coupon Management</Text>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Coupon ID</Th>
            <Th>Coupon Name</Th>
            <Th>Discount</Th>
            <Th>Expiry Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {coupons.map((coupon) => (
            <Tr key={coupon.id}>
              <Td>{coupon.id}</Td>
              <Td>{coupon.name}</Td>
              <Td>{coupon.discount}</Td>
              <Td>{coupon.expiryDate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default CouponManagementPage;