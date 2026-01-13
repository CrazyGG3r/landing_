#include<stdio.h>
#include<conio.h>
#include<stdlib.h>
#include<string.h>

int carspeed = 4;//speed of car
int truckspeed = 2;
int scarspeed = 2;
int main();
int movecounter =0 ;
int life = 5;
int spot = 0;
int reach = 0;
//=-=-=-=--=-=-=-=--=-=-=-=-=--=-= global common used variables which are important and function prototypes initialisation ends here
//=-=-=-=-=-=-=-=-=- filing system starts here


//=-=-=-=-=-=-= file is open now
struct score
{
	char name[10];
	char scoar[10];
};
moves()
{
	movecounter = movecounter + 1;
}

	char board[16][200] = 
		{
		{"----|     |------------------------|     |------------------------------------|     |-------------------------       ---"	},
		{"------------------------------------------------------------------------------------------------------------------------"	},
		{"                                                                                                                        "	},
		{"------------------------------------------------------------------------------------------------------------------------"	},
		{"                                                                                                                        "	},
		{"------------------------------------------------------------------------------------------------------------------------"	},
		{"                                                                                                                        "	},
		{"------------------------------------------------------------------------------------------------------------------------"	},
		{"                                                                                                                        "	},
		{"------------------------------------------------------------------------------------------------------------------------"	},
		{"                                                                                                                        "	},
		{"------------------------------------------------------------------------------------------------------------------------"	},
		{"                                                                                                                        "	},
		{"------------------------------------------------------------------------------------------------------------------------"	},
		{"                                                                                                                        "	}
	};
resetboundary()
{
	int i;
	for(i= 0;i<4;i++)
	{	
		board[0][i] = '-';
	}
	//=-=-=-=-
	board[0][4] = '|';
//	for(i= 5;i<10;i++)
//	{	
//		board[0][i] = ' '//spot1
//	}
	board[0][10] = '|';
	//--=--=-=
	for(i= 11 ;i<35;i++)
	{	
		board[0][i] = '-';
	}
	//=-=-=--=
	board[0][35] = '|';
//	for(i= 36;i<41;i++)
//	{	
//		board[0][i] = ' '//spot2
//	}
	board[0][41] = '|';
	//=-=-=-
	for(i= 42 ;i<78;i++)
	{	
		board[0][i] = '-';
	}
	//=-=-=-=
	board[0][78] = '|';
//	for(i= 79;i<85;i++)
//	{	
//		board[0][i] = ' '//spot3
//	}
	board[0][84] = '|';
	//=-=-=-
	for(i= 86 ;i<110;i++)
	{	
		board[0][i] = '-';
	}
	//=-=-=--
	board[0][110] = '|';
//	for(i= 111;i<116;i++)
//	{	
//		board[0][i] = ' '//spot4
//	}
	board[0][116] = '|';
	//=-=-=-=
	for(i= 117;i<121;i++)
	{	
		board[0][i] = '-';
	}
	
//boundary set
}

//=-=-=-=--=- frog body V<^>V
int prevfpointerx = 0, prevfpointery = 0;//previous pointer position
int fpointerx = 50, fpointery = 14;//start point
int	frightbodyx = fpointerx + 1, frightbodyy = fpointery;// > 
int	fleftbodyx = fpointerx - 1, fleftbodyy = fpointery;//  <
int	frightlegx = fpointerx + 2, frightlegy = fpointery;// V
int	fleftlegx = fpointerx - 2, fleftlegy = fpointery;// V
//=-=--==-=
bodymoverfunc()//moving the whole frog together, fpointer is the ^ in frog V<^>V pointing frog position
{
	board[prevfpointery][prevfpointerx] = ' ';
	board[frightbodyy][frightbodyx] = ' ';//removing previous frog[ycoords][xcoords]
	board[fleftbodyy][fleftbodyx] = ' ';
	board[frightlegy][frightlegx] = ' ';
	board[fleftlegy][fleftlegx]= ' ';
	if (fpointery<=0 || fpointery>14)
	{
		if (fpointerx!=7 && fpointerx!=38 && fpointerx!=81 && fpointerx !=113)
		{
		fpointery = 14;
		fpointerx = 50;
		life = life -1;
		}
		else
		{
//		prevfpointery = fpointery;
//		prevfpointerx = fpointerx;
		spot = spot + 1;
		frightbodyx = fpointerx + 1, frightbodyy = fpointery;// > //updating position of new frog
		fleftbodyx = fpointerx - 1, fleftbodyy = fpointery;//  <
		frightlegx = fpointerx + 2, frightlegy = fpointery;// V
		fleftlegx = fpointerx - 2, fleftlegy = fpointery;// V
		board[frightbodyy][frightbodyx] = '>';//updating new frog [ycoords][xcoords]
		board[fleftbodyy][fleftbodyx] = '<';
		board[frightlegy][frightlegx] = 'V';
		board[fleftlegy][fleftlegx]= 'V';
		board[fpointery][fpointerx] = '^';
		fpointerx = 50;
		fpointery = 14;
		goto win;
		}
	}
	if (fpointerx<=0 || fpointerx>121)
	{
		fpointerx = 50;	
		life = life-1;
	}
win:
	if (reach==1)
	{
		fpointery = 14;
		fpointerx = 50;
		reach = 0;
	}
	if(fpointery<0)
	{
		fpointery = 14;
		fpointerx = 50;
	}
	frightbodyx = fpointerx + 1, frightbodyy = fpointery;// > //updating position of new frog
	fleftbodyx = fpointerx - 1, fleftbodyy = fpointery;//  <
	frightlegx = fpointerx + 2, frightlegy = fpointery;// V
	fleftlegx = fpointerx - 2, fleftlegy = fpointery;// V
	board[frightbodyy][frightbodyx] = '>';//updating new frog [ycoords][xcoords]
	board[fleftbodyy][fleftbodyx] = '<';
	board[frightlegy][frightlegx] = 'V';
	board[fleftlegy][fleftlegx]= 'V';
	board[fpointery][fpointerx] = '^';
	
}
//lane`1
//=-=-=-=--= car1 (HH]
int car1pointerx  =170, car1pointery = 4;
int c1bonetx = car1pointerx - 3 ,c1shieldx = car1pointerx - 2 ,c1roofx = car1pointerx - 1;//(HH]
int pcar1pointerx;
//car1 move
car1move()
{
	c1bonetx = pcar1pointerx - 3;
	c1shieldx = pcar1pointerx - 2;
	c1roofx = pcar1pointerx - 1;
	board[car1pointery][pcar1pointerx] = ' ';//removing previous car[ycoords][xcoords]
	board[car1pointery][c1bonetx] = ' ';
	board[car1pointery][c1shieldx]= ' ';
	board[car1pointery][c1roofx]= ' ';
	c1bonetx = car1pointerx - 3;
	c1shieldx = car1pointerx - 2;
	c1roofx = car1pointerx - 1; 
	board[car1pointery][car1pointerx] = ']';//adding new car[ycoords][xcoords]
	board[car1pointery][c1bonetx] = '(';
	board[car1pointery][c1shieldx]= 'H';
	board[car1pointery][c1roofx]= 'H';
	if (car1pointerx <= 0)
	{
		car1pointerx = 170;
	}
	//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (car1pointerx == fpointerx)//checking for touch;
	{
		if(car1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (c1bonetx == fpointerx)//checking for touch;
	{
		if(car1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (c1shieldx == fpointerx)//checking for touch;
	{
		if(car1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (c1roofx == fpointerx)//checking for touch;
	{
		if(car1pointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (car1pointerx == frightlegx)//checking for touch;
	{
		if(car1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (c1bonetx == frightlegx)//checking for touch;
	{
		if(car1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (c1shieldx == frightlegx)//checking for touch;
	{
		if(car1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (c1roofx == frightlegx)//checking for touch;
	{
		if(car1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	//OOOOOOOOOOOOOOOOOOOOO IF YOU DARE
	
}
int car2pointerx  =150, car2pointery = 4;
int c2bonetx = car2pointerx - 3 ,c2shieldx = car2pointerx - 2 ,c2roofx = car2pointerx - 1;//(HH]
int pcar2pointerx;
//car2 move
car2move()
{
	c2bonetx = pcar2pointerx - 3;
	c2shieldx = pcar2pointerx - 2;
	c2roofx = pcar2pointerx - 1;
	board[car2pointery][pcar2pointerx] = ' ';//removing previous car[ycoords][xcoords]
	board[car2pointery][c2bonetx] = ' ';
	board[car2pointery][c2shieldx]= ' ';
	board[car2pointery][c2roofx]= ' ';
	c2bonetx = car2pointerx - 3;
	c2shieldx = car2pointerx - 2;
	c2roofx = car2pointerx - 1; 
	board[car2pointery][car2pointerx] = ']';//adding new car[ycoords][xcoords]
	board[car2pointery][c2bonetx] = '(';
	board[car2pointery][c2shieldx]= ':';
	board[car2pointery][c2roofx]= ':';
	if (car2pointerx <= 0)
	{
		car2pointerx = 150;
	}
	//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (car2pointerx == fpointerx)//checking for touch;
	{
		if(car2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (c2bonetx == fpointerx)//checking for touch;
	{
		if(car2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (c2shieldx == fpointerx)//checking for touch;
	{
		if(car2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (c2roofx == fpointerx)//checking for touch;
	{
		if(car2pointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (car2pointerx == frightlegx)//checking for touch;
	{
		if(car2pointery == fpointery) 
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (c2bonetx == frightlegx)//checking for touch;
	{
		if(car2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (c2shieldx == frightlegx)//checking for touch;
	{
		if(car2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (c2roofx == frightlegx)//checking for touch;
	{
		if(car2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	//OOOOOOOOOOOOOOOOOOOOO IF YOU DARE
	
}

//=-=-=-=--= car (HH]
int carpointerx  =130, carpointery = 4;
int cbonetx = carpointerx - 3 ,cshieldx = carpointerx - 2 ,croofx = carpointerx - 1;//(HH]
int pcarpointerx;
//car move
carmove()
{
	//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (carpointerx == fpointerx)//checking for touch;
	{
		if(carpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cbonetx == fpointerx)//checking for touch;
	{
		if(carpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cshieldx == fpointerx)//checking for touch;
	{
		if(carpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (croofx == fpointerx)//checking for touch;
	{
		if(carpointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (carpointerx == frightlegx)//checking for touch;
	{
		if(carpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cbonetx == frightlegx)//checking for touch;
	{
		if(carpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cshieldx == frightlegx)//checking for touch;
	{
		if(carpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (croofx == frightlegx)//checking for touch;
	{
		if(carpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	//OOOOOOOOOOOOOOOOOOOOO IF YOU DARE
	cbonetx = pcarpointerx - 3;
	cshieldx = pcarpointerx - 2;
	croofx = pcarpointerx - 1;
	board[carpointery][pcarpointerx] = ' ';//removing previous car[ycoords][xcoords]
	board[carpointery][cbonetx] = ' ';
	board[carpointery][cshieldx]= ' ';
	board[carpointery][croofx]= ' ';
	cbonetx = carpointerx - 3;
	cshieldx = carpointerx - 2;
	croofx = carpointerx - 1; 
	board[carpointery][carpointerx] = ']';//adding new car[ycoords][xcoords]
	board[carpointery][cbonetx] = '(';
	board[carpointery][cshieldx]= 'H';
	board[carpointery][croofx]= 'H';
	if (carpointerx <= 0)
	{
		carpointerx = 130;
	}
	//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (carpointerx == fpointerx)//checking for touch;
	{
		if(carpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cbonetx == fpointerx)//checking for touch;
	{
		if(carpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cshieldx == fpointerx)//checking for touch;
	{
		if(carpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (croofx == fpointerx)//checking for touch;
	{
		if(carpointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (carpointerx == frightlegx)//checking for touch;
	{
		if(carpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cbonetx == frightlegx)//checking for touch;
	{
		if(carpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cshieldx == frightlegx)//checking for touch;
	{
		if(carpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (croofx == frightlegx)//checking for touch;
	{
		if(carpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
}
//lane1end
//=-=-=-=--= scar :(::]
int scarpointerx  =130, scarpointery = 2;
int cslightx = scarpointerx - 4, csbonetx = scarpointerx - 3 ,csshieldx = scarpointerx - 2 ,csroofx = scarpointerx - 1;//(HH]
int pscarpointerx;
//scar move
scarmove()
{
	cslightx = pscarpointerx - 4;
	csbonetx = pscarpointerx - 3;
	csshieldx = pscarpointerx - 2;
	csroofx = pscarpointerx - 1;
	board[scarpointery][pscarpointerx] = ' ';//removing previous scar[ycoords][xcoords]
	board[scarpointery][cslightx] = ' ';
	board[scarpointery][csbonetx] = ' ';
	board[scarpointery][csshieldx]= ' ';
	board[scarpointery][csroofx]= ' ';
	csbonetx = scarpointerx - 3;
	csshieldx = scarpointerx - 2;
	csroofx = scarpointerx - 1; 
	cslightx = scarpointerx - 4;
	board[scarpointery][scarpointerx] = ']';//adding new scar[ycoords][xcoords]
	board[scarpointery][csbonetx] = '(';
	board[scarpointery][csshieldx]= ':';
	board[scarpointery][csroofx]= ':';
	board[scarpointery][cslightx] = ':';
	
	if (scarpointerx < 0 )
	{
		scarpointerx = 130;
	}
	//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (scarpointerx == fpointerx)//checking for touch;
	{
		if(scarpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (csbonetx == fpointerx)//checking for touch;
	{
		if(scarpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (csshieldx == fpointerx)//checking for touch;
	{
		if(scarpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (csroofx == fpointerx)//checking for touch;
	{
		if(scarpointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (scarpointerx == frightlegx)//checking for touch;
	{
		if(scarpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (csbonetx == frightlegx)//checking for touch;
	{
		if(scarpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (csshieldx == frightlegx)//checking for touch;
	{
		if(scarpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (csroofx == frightlegx)//checking for touch;
	{
		if(scarpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
}
//=-=-=-=--= scar1 :(::]
int scar1pointerx  =149, scar1pointery = 2;
int cs1lightx = scar1pointerx - 4, cs1bonetx = scar1pointerx - 3 ,cs1shieldx = scar1pointerx - 2 ,cs1roofx = scar1pointerx - 1;//(HH]
int pscar1pointerx;
//scar move
scar1move()
{
	cs1lightx = pscar1pointerx - 4;
	cs1bonetx = pscar1pointerx - 3;
	cs1shieldx = pscar1pointerx - 2;
	cs1roofx = pscar1pointerx - 1;
	board[scar1pointery][pscar1pointerx] = ' ';//removing previous scar[ycoords][xcoords]
	board[scar1pointery][cslightx] = ' ';
	board[scar1pointery][cs1bonetx] = ' ';
	board[scar1pointery][cs1shieldx]= ' ';
	board[scar1pointery][cs1roofx]= ' ';
	cs1bonetx = scar1pointerx - 3;
	cs1shieldx = scar1pointerx - 2;
	cs1roofx = scar1pointerx - 1; 
	cs1lightx = scar1pointerx - 4;
	board[scar1pointery][scar1pointerx] = ']';//adding new scar[ycoords][xcoords]
	board[scar1pointery][cs1bonetx] = '(';
	board[scar1pointery][cs1shieldx]= ':';
	board[scar1pointery][cs1roofx]= ':';
	board[scar1pointery][cs1lightx] = ':';
	
	if (scar1pointerx < 0 )
	{
		scar1pointerx = 149;
	}
	//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (scar1pointerx == fpointerx)//checking for touch;
	{
		if(scar1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cs1bonetx == fpointerx)//checking for touch;
	{
		if(scar1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cs1shieldx == fpointerx)//checking for touch;
	{
		if(scar1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cs1roofx == fpointerx)//checking for touch;
	{
		if(scar1pointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (scar1pointerx == frightlegx)//checking for touch;
	{
		if(scar1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cs1bonetx == frightlegx)//checking for touch;
	{
		if(scar1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cs1shieldx == frightlegx)//checking for touch;
	{
		if(scar1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cs1roofx == frightlegx)//checking for touch;
	{
		if(scar1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	//OOOOOOOOOOOOOOOO IF U DARE
}
//=-=-=-=--= scar2 :(::]
int scar2pointerx  =166, scar2pointery = 2;
int cs2lightx = scar2pointerx - 4, cs2bonetx = scar2pointerx - 3 ,cs2shieldx = scar2pointerx - 2 ,cs2roofx = scar2pointerx - 1;//(HH]
int pscar2pointerx;
//scar2 move
scar2move()
{
	cs2lightx = pscar2pointerx - 4;
	cs2bonetx = pscar2pointerx - 3;
	cs2shieldx = pscar2pointerx - 2;
	cs2roofx = pscar2pointerx - 1;
	board[scar2pointery][pscar2pointerx] = ' ';//removing previous scar[ycoords][xcoords]
	board[scar2pointery][cs2lightx] = ' ';
	board[scar2pointery][cs2bonetx] = ' ';
	board[scar2pointery][cs2shieldx]= ' ';
	board[scar2pointery][cs2roofx]= ' ';
	cs2bonetx = scar2pointerx - 3;
	cs2shieldx = scar2pointerx - 2;
	cs2roofx = scar2pointerx - 1; 
	cs2lightx = scar2pointerx - 4;
	board[scar2pointery][scar2pointerx] = ']';//adding new scar[ycoords][xcoords]
	board[scar2pointery][cs2bonetx] = '(';
	board[scar2pointery][cs2shieldx]= ':';
	board[scar2pointery][cs2roofx]= ':';
	board[scar2pointery][cs2lightx] = ':';
	
	if (scar2pointerx < 0 )
	{
		scar2pointerx = 166;
	}
	//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (scar2pointerx == fpointerx)//checking for touch;
	{
		if(scar2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cs2bonetx == fpointerx)//checking for touch;
	{
		if(scar2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cs2shieldx == fpointerx)//checking for touch;
	{
		if(scar2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cs2roofx == fpointerx)//checking for touch;
	{
		if(scar2pointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (scar2pointerx == frightlegx)//checking for touch;
	{
		if(scar2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cs2bonetx == frightlegx)//checking for touch;
	{
		if(scar2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cs2shieldx == frightlegx)//checking for touch;
	{
		if(scar2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cs2roofx == frightlegx)//checking for touch;
	{
		if(scar2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
}
//=-=-=-=--= truck :[III]
int truckpointerx  =130, truckpointery = 8;
int tlightx = truckpointerx-5, tbonetx = truckpointerx - 4 ;
int tshieldx = truckpointerx - 3 ,troof1x = truckpointerx - 2,troof2x = truckpointerx - 1;//(HH]
int ptruckpointerx;
//truck move
truckmove()
{
	tlightx = ptruckpointerx -5;
	tbonetx = ptruckpointerx - 4;
	tshieldx = ptruckpointerx - 3;
	troof2x = ptruckpointerx - 2;
	troof1x = ptruckpointerx - 1;
	board[truckpointery][ptruckpointerx] = ' ';//removing previous truck at board[ycoords][xcoords]
	board[truckpointery][tlightx] = ' ';
	board[truckpointery][tbonetx] = ' ';
	board[truckpointery][tshieldx] = ' ';
	board[truckpointery][troof1x] = ' ';
	board[truckpointery][troof2x] = ' ';
	tlightx = truckpointerx -5;
	tbonetx = truckpointerx - 4;
	tshieldx = truckpointerx - 3;
	troof2x = truckpointerx - 2;
	troof1x = truckpointerx - 1;
	board[truckpointery][truckpointerx] = ']';//adding new truck at board[ycoords][xcoords]
	board[truckpointery][tlightx] = ':';
	board[truckpointery][tbonetx] = '[';
	board[truckpointery][tshieldx] = 'I';
	board[truckpointery][troof1x] = 'I';
	board[truckpointery][troof2x] = 'I';
	if (truckpointerx < 0)
	{
		ptruckpointerx = truckpointerx;
		truckpointerx = 130;
	
	}
	//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (truckpointerx == fpointerx)//checking for touch;
	{
		if(truckpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tbonetx == fpointerx)//checking for touch;
	{
		if(truckpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tshieldx == fpointerx)//checking for touch;
	{
		if(truckpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (troof1x == fpointerx)//checking for touch;
	{
		if(truckpointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (troof2x == fpointerx)//checking for touch;
	{
		if(truckpointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (truckpointerx == frightlegx)//checking for touch;
	{
		if(truckpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tbonetx == frightlegx)//checking for touch;
	{
		if(truckpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tshieldx == frightlegx)//checking for touch;
	{
		if(truckpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (troof1x == frightlegx)//checking for touch;
	{
		if(truckpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (troof2x == fpointerx)//checking for touch;
	{
		if(truckpointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
}
//=-=-=-=--= truck1 :[IHI]
int truck1pointerx  =186, truck1pointery = 8;
int t1lightx = truck1pointerx-5, t1bonetx = truck1pointerx - 4 ;
int t1shieldx = truck1pointerx - 3 ,t1roof1x = truck1pointerx - 2,t1roof2x = truck1pointerx - 1;//(HH]
int ptruck1pointerx;
//truck move
truck1move()
{
	t1lightx = ptruck1pointerx -5;
	t1bonetx = ptruck1pointerx - 4;
	t1shieldx = ptruck1pointerx - 3;
	t1roof2x = ptruck1pointerx - 2;
	t1roof1x = ptruck1pointerx - 1;
	board[truck1pointery][ptruck1pointerx] = ' ';//removing previous truck at board[ycoords][xcoords]
	board[truck1pointery][t1lightx] = ' ';
	board[truck1pointery][t1bonetx] = ' ';
	board[truck1pointery][t1shieldx] = ' ';
	board[truck1pointery][t1roof1x] = ' ';
	board[truck1pointery][t1roof2x] = ' ';
	t1lightx = truck1pointerx -5;
	t1bonetx = truck1pointerx - 4;
	t1shieldx = truck1pointerx - 3;
	t1roof2x = truck1pointerx - 2;
	t1roof1x = truck1pointerx - 1;
	board[truck1pointery][truck1pointerx] = ']';//adding new truck at board[ycoords][xcoords]
	board[truck1pointery][t1lightx] = ':';
	board[truck1pointery][t1bonetx] = '[';
	board[truck1pointery][t1shieldx] = 'I';
	board[truck1pointery][t1roof1x] = 'I';
	board[truck1pointery][t1roof2x] = 'I';
	if (truck1pointerx < 0)
	{
		ptruck1pointerx = truck1pointerx;
		truck1pointerx = 130;
	
	}
		//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (truck1pointerx == fpointerx)//checking for touch;
	{
		if(truck1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (t1bonetx == fpointerx)//checking for touch;
	{
		if(truck1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (t1shieldx == fpointerx)//checking for touch;
	{
		if(truckpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (t1roof1x == fpointerx)//checking for touch;
	{
		if(truck1pointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (t1roof2x == fpointerx)//checking for touch;
	{
		if(truck1pointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (truck1pointerx == frightlegx)//checking for touch;
	{
		if(truck1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (t1bonetx == frightlegx)//checking for touch;
	{
		if(truck1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (t1shieldx == frightlegx)//checking for touch;
	{
		if(truck1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (t1roof1x == frightlegx)//checking for touch;
	{
		if(truck1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (t1roof2x == fpointerx)//checking for touch;
	{
		if(truck1pointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
}
//=-=-=-=--= truck2 :[III]
int truck2pointerx  =160, truck2pointery = 8;
int t2lightx = truck2pointerx-5, t2bonetx = truck2pointerx - 4 ;
int t2shieldx = truck2pointerx - 3 ,t2roof1x = truck2pointerx - 2,t2roof2x = truck2pointerx - 1;//(HH]
int ptruck2pointerx;
//truck move
truck2move()
{
	t2lightx = ptruck2pointerx -5;
	t2bonetx = ptruck2pointerx - 4;
	t2shieldx = ptruck2pointerx - 3;
	t2roof2x = ptruck2pointerx - 2;
	t2roof1x = ptruck2pointerx - 1;
	board[truck2pointery][ptruck2pointerx] = ' ';//removing previous truck at board[ycoords][xcoords]
	board[truck2pointery][t2lightx] = ' ';
	board[truck2pointery][t2bonetx] = ' ';
	board[truck2pointery][t2shieldx] = ' ';
	board[truck2pointery][t2roof1x] = ' ';
	board[truck2pointery][t2roof2x] = ' ';
	t2lightx = truck2pointerx -5;
	t2bonetx = truck2pointerx - 4;
	t2shieldx = truck2pointerx - 3;
	t2roof2x = truck2pointerx - 2;
	t2roof1x = truck2pointerx - 1;
	board[truck2pointery][truck2pointerx] = ']';//adding new truck at board[ycoords][xcoords]
	board[truck2pointery][t2lightx] = ':';
	board[truck2pointery][t2bonetx] = '[';
	board[truck2pointery][t2shieldx] = 'I';
	board[truck2pointery][t2roof1x] = 'I';
	board[truck2pointery][t2roof2x] = 'I';
	if (truck2pointerx < 0)
	{
		ptruck2pointerx = truck2pointerx;
		truck2pointerx = 160;
	
	}
	//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (truck2pointerx == fpointerx)//checking for touch;
	{
		if(truck2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (t2bonetx == fpointerx)//checking for touch;
	{
		if(truck1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (t2shieldx == fpointerx)//checking for touch;
	{
		if(truckpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (t2roof1x == fpointerx)//checking for touch;
	{
		if(truck1pointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (t2roof2x == fpointerx)//checking for touch;
	{
		if(truck2pointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (truck2pointerx == frightlegx)//checking for touch;
	{
		if(truck2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (t2bonetx == frightlegx)//checking for touch;
	{
		if(truck2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (t2shieldx == frightlegx)//checking for touch;
	{
		if(truck2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (t2roof1x == frightlegx)//checking for touch;
	{
		if(truck2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (t2roof2x == fpointerx)//checking for touch;
	{
		if(truck2pointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
}
//-==-=--=-=-=-=truckb [HHH]:
int truckbpointerx  =-30, truckbpointery = 6;
int tblightx = truckbpointerx + 5, tbbonetx = truckbpointerx + 4 ;
int tbshieldx = truckbpointerx + 3 ,tbroof1x = truckbpointerx + 2,tbroof2x = truckbpointerx + 1;//(HH]
int pbtruckpointerx;
//truck move
truckbmove()
{
	tblightx = pbtruckpointerx + 5;
	tbonetx = pbtruckpointerx + 4;
	tbshieldx = pbtruckpointerx + 3;
	tbroof2x = pbtruckpointerx + 2;
	tbroof1x = pbtruckpointerx + 1;
	board[truckbpointery][pbtruckpointerx] = ' ';//removing previous truck at board[ycoords][xcoords]
	board[truckbpointery][tblightx] = ' ';
	board[truckbpointery][tbbonetx] = ' ';
	board[truckbpointery][tbshieldx] = ' ';
	board[truckbpointery][tbroof1x] = ' ';
	board[truckbpointery][tbroof2x] = ' ';
	tblightx = truckbpointerx + 5;
	tbbonetx = truckbpointerx + 4;
	tbshieldx = truckbpointerx + 3;
	tbroof2x = truckbpointerx + 2;
	tbroof1x = truckbpointerx + 1;
	board[truckbpointery][truckbpointerx] = '[';//adding new truck at board[ycoords][xcoords]
	board[truckbpointery][tblightx] = ':';
	board[truckbpointery][tbbonetx] = ']';
	board[truckbpointery][tbshieldx] = 'H';
	board[truckbpointery][tbroof1x] = 'H';
	board[truckbpointery][tbroof2x] = 'H';
	if (truckbpointerx > 120 )
	{
		pbtruckpointerx = truckbpointerx;
		truckbpointerx = -30;
	
	}
		//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (truckbpointerx == fpointerx)//checking for touch;
	{
		if(truckbpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tbbonetx == fpointerx)//checking for touch;
	{
		if(truckbpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tbshieldx == fpointerx)//checking for touch;
	{
		if(truckbpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tbroof1x == fpointerx)//checking for touch;
	{
		if(truckbpointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tbroof2x == fpointerx)//checking for touch;
	{
		if(truckbpointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (truckbpointerx == frightlegx)//checking for touch;
	{
		if(truckbpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tbbonetx == frightlegx)//checking for touch;
	{
		if(truck1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tbshieldx == frightlegx)//checking for touch;
	{
		if(truckbpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tbroof1x == frightlegx)//checking for touch;
	{
		if(truckbpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tbroof2x == fpointerx)//checking for touch;
	{
		if(truckbpointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
}
//-==-=--=-=-=-=truckb [HHH]:
int truckb1pointerx  =-5, truckb1pointery = 6;
int tb1lightx = truckb1pointerx + 5, tb1bonetx = truckb1pointerx + 4 ;
int tb1shieldx = truckb1pointerx + 3 ,tb1roof1x = truckb1pointerx + 2,tb1roof2x = truckb1pointerx + 1;//(HH]
int pbtruck1pointerx;
//truckb1 move
truckb1move()
{
	board[truckb1pointery][pbtruck1pointerx] = ' ';//removing previous truck at board[ycoords][xcoords]
	board[truckb1pointery][tb1lightx] = ' ';
	board[truckb1pointery][tb1bonetx] = ' ';
	board[truckb1pointery][tb1shieldx] = ' ';
	board[truckb1pointery][tb1roof1x] = ' ';
	board[truckb1pointery][tb1roof2x] = ' ';
	tblightx = pbtruck1pointerx + 5;
	tb1bonetx = pbtruck1pointerx + 4;
	tb1shieldx = pbtruck1pointerx + 3;
	tb1roof2x = pbtruck1pointerx + 2;
	tb1roof1x = pbtruck1pointerx + 1;
	board[truckb1pointery][pbtruck1pointerx] = ' ';//removing previous truck at board[ycoords][xcoords]
	board[truckb1pointery][tb1lightx] = ' ';
	board[truckb1pointery][tb1bonetx] = ' ';
	board[truckb1pointery][tb1shieldx] = ' ';
	board[truckb1pointery][tb1roof1x] = ' ';
	board[truckb1pointery][tb1roof2x] = ' ';
	tb1lightx = truckb1pointerx + 5;
	tb1bonetx = truckb1pointerx + 4;
	tb1shieldx = truckb1pointerx + 3;
	tb1roof2x = truckb1pointerx + 2;
	tb1roof1x = truckb1pointerx + 1;
	board[truckb1pointery][truckb1pointerx] = '[';//adding new truck at board[ycoords][xcoords]
	board[truckbpointery][tb1lightx] = ':';
	board[truckbpointery][tb1bonetx] = ']';
	board[truckbpointery][tb1shieldx] = 'H';
	board[truckbpointery][tb1roof1x] = 'H';
	board[truckbpointery][tb1roof2x] = 'H';
	if (truckb1pointerx > 120 )
	{
		pbtruck1pointerx = truckb1pointerx;
		truckb1pointerx = -30;
	
	}
			//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (truckb1pointerx == fpointerx)//checking for touch;
	{
		if(truckb1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tb1bonetx == fpointerx)//checking for touch;
	{
		if(truckb1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tb1shieldx == fpointerx)//checking for touch;
	{
		if(truckb1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tb1roof1x == fpointerx)//checking for touch;
	{
		if(truckb1pointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tb1roof2x == fpointerx)//checking for touch;
	{
		if(truckbpointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (truckb1pointerx == frightlegx)//checking for touch;
	{
		if(truckb1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tb1bonetx == frightlegx)//checking for touch;
	{
		if(truckb1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tb1shieldx == frightlegx)//checking for touch;
	{
		if(truckb1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tb1roof1x == frightlegx)//checking for touch;
	{
		if(truckb1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (tb1roof2x == fpointerx)//checking for touch;
	{
		if(truckbpointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	
}

int carb1pointerx  =170; int carb1pointery = 10;
int cb1bonetx = carb1pointerx - 3 ,cb1shieldx = carb1pointerx - 2 ,cb1roofx = carb1pointerx - 1;//(HH]
int pbcar1pointerx;
//carb1 move
carb1move()
{
	cb1bonetx = pbcar1pointerx - 3;
	cb1shieldx = pbcar1pointerx - 2;
	cb1roofx = pbcar1pointerx - 1;
	board[carb1pointery][pbcar1pointerx] = ' ';//removing previous car[ycoords][xcoords]
	board[carb1pointery][cb1bonetx] = ' ';
	board[carb1pointery][cb1shieldx]= ' ';
	board[carb1pointery][cb1roofx]= ' ';
	cb1bonetx = carb1pointerx - 3;
	cb1shieldx = carb1pointerx - 2;
	cb1roofx = carb1pointerx - 1; 
	board[carb1pointery][carb1pointerx] = ']';//adding new car[ycoords][xcoords]
	board[carb1pointery][cb1bonetx] = '(';
	board[carb1pointery][cb1shieldx]= 'H';
	board[carb1pointery][cb1roofx]= 'H';
	if (carb1pointerx <= 0)
	{
		carb1pointerx = 170;
	}
	//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (carb1pointerx == fpointerx)//checking for touch;
	{
		if(carb1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cb1bonetx == fpointerx)//checking for touch;
	{
		if(carb1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cb1shieldx == fpointerx)//checking for touch;
	{
		if(carb1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cb1roofx == fpointerx)//checking for touch;
	{
		if(carb1pointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (carb1pointerx == frightlegx)//checking for touch;
	{
		if(carb1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cb1bonetx == frightlegx)//checking for touch;
	{
		if(carb1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cb1shieldx == frightlegx)//checking for touch;
	{
		if(carb1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cb1roofx == frightlegx)//checking for touch;
	{
		if(carb1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	//OOOOOOOOOOOOOOOOOOOOO IF YOU DARE
	
}
int carb2pointerx  =150; int carb2pointery = 10;
int cb2bonetx = carb2pointerx - 3 ,cb2shieldx = carb2pointerx - 2 ,cb2roofx = carb2pointerx - 1;//(HH]
int pbcar2pointerx;
//carb2 move
carb2move()
{
	cb2bonetx = pcar2pointerx - 3;
	cb2shieldx = pcar2pointerx - 2;
	cb2roofx = pcar2pointerx - 1;
	board[carb2pointery][pcar2pointerx] = ' ';//removing previous car[ycoords][xcoords]
	board[carb2pointery][cb2bonetx] = ' ';
	board[carb2pointery][cb2shieldx]= ' ';
	board[carb2pointery][cb2roofx]= ' ';
	cb2bonetx = carb2pointerx - 3;
	cb2shieldx = carb2pointerx - 2;
	cb2roofx = carb2pointerx - 1; 
	board[carb2pointery][carb2pointerx] = ']';//adding new car[ycoords][xcoords]
	board[carb2pointery][cb2bonetx] = '(';
	board[carb2pointery][cb2shieldx]= ':';
	board[carb2pointery][cb2roofx]= ':';
	if (carb2pointerx <= 0)
	{
		carb2pointerx = 150;
	}
	//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (carb2pointerx == fpointerx)//checking for touch;
	{
		if(carb2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cb2bonetx == fpointerx)//checking for touch;
	{
		if(carb2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cb2shieldx == fpointerx)//checking for touch;
	{
		if(carb2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cb2roofx == fpointerx)//checking for touch;
	{
		if(carb2pointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (carb2pointerx == frightlegx)//checking for touch;
	{
		if(carb2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cb2bonetx == frightlegx)//checking for touch;
	{
		if(car2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cb2shieldx == frightlegx)//checking for touch;
	{
		if(carb2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cb2roofx == frightlegx)//checking for touch;
	{
		if(carb2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	//OOOOOOOOOOOOOOOOOOOOO IF YOU DARE
	
}

//=-=-=-=--= car (HH]
int carbpointerx  =130; int carbpointery = 10;
int cbbonetx = carbpointerx - 3 ,cbshieldx = carbpointerx - 2 ,cbroofx = carbpointerx - 1;//(HH]
int pbcarpointerx;
//carbmove
carbmove()
{
	
	cbbonetx = pcarpointerx - 3;
	cbshieldx = pcarpointerx - 2;
	cbroofx = pcarpointerx - 1;
	board[carbpointery][pbcarpointerx] = ' ';//removing previous car[ycoords][xcoords]
	board[carbpointery][cbbonetx] = ' ';
	board[carbpointery][cbshieldx]= ' ';
	board[carbpointery][cbroofx]= ' ';
	cbbonetx = carbpointerx - 3;
	cbshieldx = carbpointerx - 2;
	cbroofx = carbpointerx - 1; 
	board[carbpointery][carbpointerx] = ')';//adding new car[ycoords][xcoords]
	board[carbpointery][cbbonetx] = '(';
	board[carbpointery][cbshieldx]= 'I';
	board[carbpointery][cbroofx]= 'I';
	if (carbpointerx <= 0)
	{
		carbpointerx = 130;
	}
	//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (carbpointerx == fpointerx)//checking for touch;
	{
		if(carbpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cbbonetx == fpointerx)//checking for touch;
	{
		if(carbpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cbshieldx == fpointerx)//checking for touch;
	{
		if(carbpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cbroofx == fpointerx)//checking for touch;
	{
		if(carbpointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (carbpointerx == frightlegx)//checking for touch;
	{
		if(carbpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cbbonetx == frightlegx)//checking for touch;
	{
		if(carbpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cbshieldx == frightlegx)//checking for touch;
	{
		if(carbpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cbroofx == frightlegx)//checking for touch;
	{
		if(carbpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
}
//=-=-=-=--= car2 (IO>
int carr2pointerx  =-20, carr2pointery = 12;
int cr2bonetx = carr2pointerx + 3 ,cr2shieldx = carr2pointerx + 2 ,cr2roofx = carr2pointerx + 1;//(HH]
int prcar2pointerx;
//carr2 
carr2move()
{
	if (carr2pointerx >=120)
	{
		carr2pointerx = -20;
	}
	cr2bonetx = prcar2pointerx + 3;
	cr2shieldx = prcar2pointerx + 2;
	cr2roofx = prcar2pointerx + 1;
	board[carr2pointery][prcar2pointerx] = ' ';//removing previous car[ycoords][xcoords]
	board[carr2pointery][cr2bonetx] = ' ';
	board[carr2pointery][cr2shieldx]= ' ';
	board[carr2pointery][cr2roofx]= ' ';
	cr2bonetx = carr2pointerx + 3;
	cr2shieldx = carr2pointerx + 2;
	cr2roofx = carr2pointerx + 1; 
	board[carr2pointery][carr2pointerx] = '(';//adding new car[ycoords][xcoords]
	board[carr2pointery][cr2bonetx] = '>';
	board[carr2pointery][cr2shieldx]= 'O';
	board[carr2pointery][cr2roofx]= 'I';
	//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (carr2pointerx == fpointerx)//checking for touch;
	{
		if(carr2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cr2bonetx == fpointerx)//checking for touch;
	{
		if(carr2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cr2shieldx == fpointerx)//checking for touch;
	{
		if(carr2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cr2roofx == fpointerx)//checking for touch;
	{
		if(carr2pointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (carr2pointerx == frightlegx)//checking for touch;
	{
		if(carr2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cr2bonetx == frightlegx)//checking for touch;
	{
		if(carr2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cr2shieldx == frightlegx)//checking for touch;
	{
		if(carr2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cr2roofx == frightlegx)//checking for touch;
	{
		if(carr2pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	//OOOOOOOOOOOOOOOOOOOOO IF YOU DARE
	
}
//==carr1 [II)
int carr1pointerx  =-5, carr1pointery = 12;
int cr1bonetx = carr1pointerx + 3 ,cr1shieldx = carr1pointerx + 2 ,cr1roofx = carr1pointerx + 1;//(HH]
int prcar1pointerx;
//carr1 move [II)
carr1move()
{
	if (carr1pointerx >=120)
	{
		carr1pointerx = -7;
	}
	cr1bonetx = prcar1pointerx + 3;
	cr1shieldx = prcar1pointerx + 2;
	cr1roofx = prcar1pointerx + 1;
	board[carr1pointery][prcar1pointerx] = ' ';//removing previous car[ycoords][xcoords]
	board[carr1pointery][cr1bonetx] = ' ';
	board[carr1pointery][cr1shieldx]= ' ';
	board[carr1pointery][cr1roofx]= ' ';
	cr1bonetx = carr1pointerx + 3;
	cr1shieldx = carr1pointerx + 2;
	cr1roofx = carr1pointerx + 1; 
	board[carr1pointery][carr1pointerx] = '[';//adding new car[ycoords][xcoords]
	board[carr1pointery][cr1bonetx] = ')';
	board[carr1pointery][cr1shieldx]= 'H';
	board[carr1pointery][cr1roofx]= 'H';
	//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (carr1pointerx == fpointerx)//checking for touch;
	{
		if(carr1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cr1bonetx == fpointerx)//checking for touch;
	{
		if(carr1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cr1shieldx == fpointerx)//checking for touch;
	{
		if(carr1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cr1roofx == fpointerx)//checking for touch;
	{
		if(carr1pointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (carr1pointerx == frightlegx)//checking for touch;
	{
		if(carr1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cr1bonetx == frightlegx)//checking for touch;
	{
		if(carr1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cr1shieldx == frightlegx)//checking for touch;
	{
		if(carr1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (cr1roofx == frightlegx)//checking for touch;
	{
		if(carr1pointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	//OOOOOOOOOOOOOOOOOOOOO IF YOU DARE
	
}
//=-=-=-=--= car2 (IO>
int carrpointerx  =-35, carrpointery = 12;
int crbonetx = carrpointerx + 3 ,crshieldx = carrpointerx + 2 ,crroofx = carrpointerx + 1;//(HH]
int prcarpointerx;
//carr 
carrmove()
{
	if (carrpointerx >=120)
	{
		carrpointerx = -20;
	}
	crbonetx = prcarpointerx + 3;
	crshieldx = prcarpointerx + 2;
	crroofx = prcarpointerx + 1;
	board[carrpointery][prcarpointerx] = ' ';//removing previous car[ycoords][xcoords]
	board[carrpointery][crbonetx] = ' ';
	board[carrpointery][crshieldx]= ' ';
	board[carrpointery][crroofx]= ' ';
	crbonetx = carr2pointerx + 3;
	crshieldx = carrpointerx + 2;
	crroofx = carrpointerx + 1; 
	board[carrpointery][carrpointerx] = '(';//adding new car[ycoords][xcoords]
	board[carrpointery][crbonetx] = '>';
	board[carrpointery][crshieldx]= 'O';
	board[carrpointery][crroofx]= 'I';
	//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TOUCH
	if (carrpointerx == fpointerx)//checking for touch;
	{
		if(carrpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (crbonetx == fpointerx)//checking for touch;
	{
		if(carrpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (crshieldx == fpointerx)//checking for touch;
	{
		if(carrpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (crroofx == fpointerx)//checking for touch;
	{
		if(carrpointery == frightlegx)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (carrpointerx == frightlegx)//checking for touch;
	{
		if(carrpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (crbonetx == frightlegx)//checking for touch;
	{
		if(carrpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (crshieldx == frightlegx)//checking for touch;
	{
		if(carrpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	if (crroofx == frightlegx)//checking for touch;
	{
		if(carrpointery == fpointery)
		{
			life = life - 1;
			fpointery = 14;
			fpointerx = 50;
			bodymoverfunc();
		}
	}
	//OOOOOOOOOOOOOOOOOOOOO IF YOU DARE
	
}
draw()
{
	int i;
	for (i=0;i<16;i++)
	{
		puts(board[i]);
		
	}
	printf("Lives left: %d\n",life);
	printf("Score: %d", movecounter);
	resetboundary();
}
obsmove()//moving obstacle function
{
	carmove();
	car1move();
	car2move();
	truckmove();
	truck1move();
	truck2move();
	scarmove();
	scar1move();
	scar2move();
	truckbmove();
	truckb1move();
	carbmove();
	carb2move();
	carb1move();
	carr1move();
	carr2move();
	
	resetboundary();
}
obspositionupdater()
{
	pcarpointerx = carpointerx;
	carpointerx = carpointerx - carspeed;
	pcar1pointerx = car1pointerx;
	car1pointerx = car1pointerx - carspeed;
	pcar2pointerx = car2pointerx;
	car2pointerx = car2pointerx - carspeed;
	pscarpointerx = scarpointerx;
	scarpointerx = scarpointerx - scarspeed;
	pscar1pointerx = scar1pointerx;
	scar1pointerx = scar1pointerx - scarspeed;
	pscar2pointerx = scar2pointerx;
	scar2pointerx = scar2pointerx - scarspeed;
	ptruckpointerx = truckpointerx;
	truckpointerx = truckpointerx - truckspeed;
	ptruck1pointerx = truck1pointerx;
	truck1pointerx = truck1pointerx - truckspeed;
	ptruck2pointerx = truck2pointerx;
	truck2pointerx = truck2pointerx - truckspeed;
	pbtruckpointerx = truckbpointerx;
	truckbpointerx = truckbpointerx + truckspeed;
	pbtruck1pointerx = truckb1pointerx;
	truckb1pointerx = truckb1pointerx + truckspeed;
	pbcarpointerx = carbpointerx;
	carbpointerx = carbpointerx - carspeed;
	pbcar2pointerx = carb2pointerx;
	carb2pointerx = carb2pointerx - carspeed;
	pbcar1pointerx = carb1pointerx;
	carb1pointerx = carb1pointerx - carspeed;
	prcar1pointerx = carr1pointerx;
	carr1pointerx = carr1pointerx + carspeed;
	prcar2pointerx = carr2pointerx;
	carr2pointerx = carr2pointerx + carspeed;
}

input()
{
	
        switch (getch()) 
		{
        case 'a'://a
        	moves();
            prevfpointerx = fpointerx;
            prevfpointery = fpointery;
            fpointerx = fpointerx - 1;
            obspositionupdater();
            obsmove();
            break;
            
        case 's'://s
			moves();
			prevfpointery = fpointery;
			prevfpointerx = fpointerx;
            fpointery = fpointery + 2;
            obspositionupdater();
            obsmove();
            break;
            
        case 'd'://d
	        moves();
			prevfpointerx = fpointerx;
	        prevfpointery = fpointery;
            fpointerx = fpointerx + 1;
           	obspositionupdater();
            obsmove();
            break;
            
        case 'w'://w
        	moves();
        	prevfpointery = fpointery;
        	prevfpointerx = fpointerx;
            fpointery = fpointery - 2;
            obspositionupdater();
            obsmove();
            break;
            

        }
    bodymoverfunc();
}
won()
{
	char name[5];
	FILE *fptr; 
	fptr = fopen("scor.txt","r+");
	fseek(fptr, 0, SEEK_END); //=-=-= = cursor to end
	printf("\n You won.\n");
	printf("Enter name: ");
	scanf(" %s",name);
//	gets(name);
	printf("Your score is: %d\n",movecounter);
	printf("\nx-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x\n");
	fprintf(fptr,"\n%s %d",name,movecounter);
	fclose(fptr);
	
	
}
start()
{
	int i;
	for(i= 5;i<10;i++)
	{	
		board[0][i] = ' ';//spot1
	}
	
	for(i= 36;i<41;i++)
	{	
		board[0][i] = ' ';//spot2
	}
	
	for(i= 79;i<85;i++)
	{	
		board[0][i] = ' ';//spot3
	}
	
	for(i= 111;i<116;i++)
	{	
		board[0][i] = ' ';//spot4
	}
	life = 5;
	movecounter =0;
	//=--=-=-=-=--=-=-=-=-=--=-=-=-=-=refreshing the spots, lives and score for board.
	system("cls");
	draw();
	while(life>=0)
	{
	input();
	system("cls");	
	draw();
	if (spot == 4)
	{
		won();
	wrongpress:
		switch(getch())
		{
			case 8:
				system("cls");
				main();
				goto rightpress;
				break;
			default:
				goto wrongpress;
		}
	rightpress:
		break;
	}
	}

	if (life <0 )
	{
		printf("\nYou lost :(");
	}
	wrongpress1:
		switch(getch())
		{
			case 8:
				system("cls");
				main();
				break;
			default:
				goto wrongpress1;
		}
	
}

int cred();
int quit = 0;
char title[7][102] = 
	{
    	{"FFFFFF  RRRRRRR       OOOOOO         GGGGGGG         GGGGGGG     EEEEEEEE  RRRRRRR      ::          "},
		{"FF      RR    RR    OO      OO     GG              GG            EE        RR    RR     ::          "},
		{"FF	RR    RR   OO        OO   GG              GG             EE        RR    RR       ::          "},
		{"FFFFFF  RR RRRR    OO        OO   GG    GGGGGG    GG    GGGGGG   EEEEEEE   RR RRRR      ::  ::::::: "},
		{"FF	RR    RR   OO        OO   GG    GG  GG    GG    GG  GG   EE        RR    RR       ::          "},
		{"FF      RR     RR   OO      OO     GG       GG     GG       GG   EE        RR     RR    ::          "},
		{"FF      RR      RR    OOOOOO         GGGGGGG         GGGGGGG     EEEEEEEE  RR      RR   ::          "}	
	};
char menu[6][25] = 
	{
		{" START GAME <         "},
		{" SETTINGS             "},
		{" SCORES               "},
		{" HELP                 "},
		{" CREDITS              "},
		{" QUIT                 "}
	};
//=-=-=-=--=-=-=-==-=-=--=
int pointerx  = 12,pointery = 0 ;
int prevpointery = 0 ;
pointermovement() 
{
	
	if(pointery>5)
	{
		pointery = 0;
	}
	if(pointery<0)
	{
		pointery = 4;
	}
	menu[prevpointery][pointerx] = ' ';
	menu[pointery][pointerx] = '<';

}

highscores()//=-=--=-=-=-=-=-=-=--=-=-Displaying the highest scores of all times
{
wrongpress:
	system("cls");
	char buffer[15],c;
	struct score player[10];
	FILE *ree;
	ree = fopen("scor.txt","r");
	int i = 0,j=0;
	printf("=-=-=-=-=-=-=-=| A L L T I M E S C O R E S |=-=-=-=-=-=-=-=\n");

	while ((c = fgetc(ree)) != EOF)
	printf("%c", c);

	printf("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-\n ");
	printf("\nPress Backspace to return.");
	switch(getch())
	{
		case 8:
			system("cls");
			main();
			break;
		default:
			goto wrongpress;
	}
	fclose(ree);
}
help()
{
	wrongpress:
		system("cls");
		printf("Frogger is stuck in time. Every key you press, updates the time in game. For example, if u \nmove one step forward, all the obstacles move one step ahead in their routine. \nIf you collide with an object or stand infront of the object for ore than 1 move, it is considered \na life lost and your position is set back to default. Your goal is to reach the four empty spots on top\nin least possible moves.");
		printf("\n=-=--=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
		printf("\nPress A to move left\n");
		printf("Press W to move forward\n");
		printf("Press S to move backward\n");
		printf("Press D to move right\n");
		printf("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
		printf("Press Backspace to return to menu");
		switch(getch())
		{
			case 8:
				system("cls");
				main();
				break;
			default:
				goto wrongpress;
		}
}
cred()
{
wrongpress:
	system("cls");
	printf(" Made by :  \n");
	printf("            Shah33r Ul Islam 4936\n");
	printf("            Abdul W@say 3435\n");
	printf("            M. Shahzip 4601\n");
	printf("            S&eed S&leem 4847\n");
	printf("\nx-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x\n");
	printf("\nProcesses involved: \n");
	printf("Idea Generation\n");
	printf("Logic Derivation\n");
	printf("Function Mapping\n");
	printf("Library Learning\n");
	printf("Googling\n");
	printf("Board and character Generation\n");
	printf("Menu Making\n");
	printf("Logic fixing\n");
	printf("Debugging\n");
	printf("Testing\n");
	printf("Treating ourselves after success.\n");
	printf("\nx-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x\n");
	printf("\n\nPress Backspace to return to menu");
	switch(getch())
		{
			case 8:
				system("cls");
				main();
				break;
			default:
				goto wrongpress;
		}
}
setting()
{
	system("cls");
	printf("Enter speed of car: ");
	scanf("%d",&carspeed);
	scarspeed = carspeed/2;
	truckspeed = carspeed/2;
	printf("\n=-=-=-=--=-=--S A V E D--=-=-=-=-=-\n");
	printf("\n\nPress Backspace to return to menu");
wrongpress:
	switch(getch())
		{
			case 8:
				system("cls");
				main();
				break;
			default:
				goto wrongpress;
		}
}
logicmenu()
{
	switch(pointery)
	{
		case 0:
			start();
			break;
		case 1:
			setting();
			break;
		case 2:
			highscores();
			break;
		case 3:
			help();
			break;
		case 4:
			cred();	
			break;		
		case 5:
			quit++;
			main();
			break;
			
	}
}
inputmenu()
{
//	if (kbhit())
//	{
	int a = getch();
		switch(a)
		{
			
			case 115:
				prevpointery = pointery;
				pointery = pointery + 1;
				pointermovement();
				break;
			
			case 119:
				prevpointery = pointery;
				pointery = pointery - 1;
				pointermovement();
				break;

			case 13:
				logicmenu();				
				break;			
			
		}

}
draw1()
{
	int i,j;

		for(j=0;j<6;j++)
		{
			puts(menu[j]);
		}
	

}
drak()
{
	int x;
	for(x=0;x<7;x++)
	{
		puts(title[x]);
	}
}
meenu()
{
	drak();
	life = 5;
	movecounter = 0;
	printf("\n                             S T U C K  I N  T I M E");
	printf("\n =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n");
	draw1();
	while(quit!=1)
	{
		inputmenu();
		system("cls");
		drak();
		printf("\n                             S T U C K  I N  T I M E");
		printf("\n =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n");
		draw1();
		
	}
}
main()
{
		meenu();

}